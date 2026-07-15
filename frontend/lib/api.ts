const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getSessionId(): string {
  if (typeof window === "undefined") return "default";
  let id = localStorage.getItem("sessionId");
  if (!id) {
    id = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("sessionId", id);
  }
  return id;
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (typeof window !== "undefined") {
    headers["x-session-id"] = getSessionId();
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || "Request failed");
  }

  return res.json();
}

export async function getProducts(category?: string, search?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  const query = params.toString() ? `?${params}` : "";
  return apiFetch(`/api/products${query}`);
}

export async function getProduct(id: number) {
  return apiFetch(`/api/products/${id}`);
}

export async function getCategories() {
  return apiFetch("/api/categories");
}

export async function getCart() {
  return apiFetch("/api/cart");
}

export async function addToCart(productId: number, quantity = 1) {
  return apiFetch("/api/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function updateCartItem(productId: number, quantity: number) {
  return apiFetch(`/api/cart/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

export async function removeFromCart(productId: number) {
  return apiFetch(`/api/cart/${productId}`, { method: "DELETE" });
}

export async function checkout(data: {
  name: string;
  email: string;
  address: string;
}) {
  return apiFetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
