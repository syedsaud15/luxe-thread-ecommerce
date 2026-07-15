"use client";

import { useState } from "react";
import Link from "next/link";
import { checkout } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import type { Order } from "@/lib/types";

export default function CheckoutPage() {
  const { cart, refreshCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = await checkout(form);
      setOrder(result);
      await refreshCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (order) {
    return (
      <div className="order-success">
        <div className="order-success-icon">✦</div>
        <h1>Thank You</h1>
        <p className="order-id">Order {order.orderId}</p>
        <p style={{ marginBottom: "2rem", color: "var(--color-text-muted)", fontWeight: 300 }}>
          {order.customer.name}, your order of{" "}
          <strong>${order.total.toFixed(2)}</strong> has been confirmed.
          Expect delivery within 3–5 business days.
        </p>
        <Link href="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">◇</div>
        <h2>Your bag is empty</h2>
        <p>Add pieces before checking out.</p>
        <Link href="/products" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
          Shop Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-form container">
      <h1>Checkout</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", fontWeight: 300 }}>
        Order total <strong>${cart.total.toFixed(2)}</strong> · {cart.itemCount} {cart.itemCount === 1 ? "piece" : "pieces"}
      </p>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Shipping Address</label>
          <textarea
            id="address"
            name="address"
            required
            value={form.address}
            onChange={handleChange}
            placeholder="123 Main St, City, State, ZIP"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
          style={{ width: "100%" }}
        >
          {submitting ? "Processing..." : `Complete Order — $${cart.total.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}
