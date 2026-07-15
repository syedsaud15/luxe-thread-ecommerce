export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
  subtotal: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  orderId: string;
  message: string;
  customer: { name: string; email: string; address: string };
  items: CartItem[];
  total: number;
}
