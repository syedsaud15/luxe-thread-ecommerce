const express = require("express");
const cors = require("cors");
const products = require("./data/products.json");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const carts = new Map();

function getOrCreateCart(sessionId) {
  if (!carts.has(sessionId)) {
    carts.set(sessionId, []);
  }
  return carts.get(sessionId);
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/products", (req, res) => {
  const { category, search } = req.query;
  let result = [...products];

  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }

  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

app.get("/api/categories", (_req, res) => {
  const categories = [...new Set(products.map((p) => p.category))];
  res.json(categories);
});

app.get("/api/cart", (req, res) => {
  const sessionId = req.headers["x-session-id"] || "default";
  const cart = getOrCreateCart(sessionId);
  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      product,
      subtotal: product ? product.price * item.quantity : 0,
    };
  });
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  res.json({ items, total, itemCount: items.reduce((s, i) => s + i.quantity, 0) });
});

app.post("/api/cart", (req, res) => {
  const sessionId = req.headers["x-session-id"] || "default";
  const { productId, quantity = 1 } = req.body;

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const cart = getOrCreateCart(sessionId);
  const existing = cart.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, product.stock);
  } else {
    cart.push({ productId, quantity: Math.min(quantity, product.stock) });
  }

  res.json({ message: "Added to cart", productId, quantity });
});

app.put("/api/cart/:productId", (req, res) => {
  const sessionId = req.headers["x-session-id"] || "default";
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;

  const cart = getOrCreateCart(sessionId);
  const item = cart.find((i) => i.productId === productId);

  if (!item) {
    return res.status(404).json({ error: "Item not in cart" });
  }

  const product = products.find((p) => p.id === productId);
  if (quantity <= 0) {
    const index = cart.indexOf(item);
    cart.splice(index, 1);
  } else {
    item.quantity = Math.min(quantity, product.stock);
  }

  res.json({ message: "Cart updated" });
});

app.delete("/api/cart/:productId", (req, res) => {
  const sessionId = req.headers["x-session-id"] || "default";
  const productId = parseInt(req.params.productId);
  const cart = getOrCreateCart(sessionId);
  const index = cart.findIndex((i) => i.productId === productId);

  if (index === -1) {
    return res.status(404).json({ error: "Item not in cart" });
  }

  cart.splice(index, 1);
  res.json({ message: "Item removed" });
});

app.delete("/api/cart", (req, res) => {
  const sessionId = req.headers["x-session-id"] || "default";
  carts.set(sessionId, []);
  res.json({ message: "Cart cleared" });
});

app.post("/api/checkout", (req, res) => {
  const sessionId = req.headers["x-session-id"] || "default";
  const { name, email, address } = req.body;
  const cart = getOrCreateCart(sessionId);

  if (!name || !email || !address) {
    return res.status(400).json({ error: "Name, email, and address are required" });
  }

  if (cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const orderId = `ORD-${Date.now()}`;
  const items = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product, subtotal: product.price * item.quantity };
  });
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  carts.set(sessionId, []);

  res.json({
    orderId,
    message: "Order placed successfully",
    customer: { name, email, address },
    items,
    total,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
