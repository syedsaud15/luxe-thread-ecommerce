"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, loading, updateItem, removeItem } = useCart();

  if (loading) {
    return <div className="loading container">Loading cart...</div>;
  }

  if (cart.items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">◇</div>
        <h2>Your bag is empty</h2>
        <p>Discover pieces to complete your look.</p>
        <Link href="/products" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
          Shop Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="section-title">Your Bag</h1>
        <p className="section-subtitle" style={{ textAlign: "left", margin: "0 0 2.5rem" }}>
          {cart.itemCount} {cart.itemCount === 1 ? "piece" : "pieces"} selected
        </p>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.productId} className="cart-item">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.product.name}</p>
                  <p className="cart-item-price">
                    ${item.product.price.toFixed(2)} each
                  </p>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="quantity-btn"
                    onClick={() => updateItem(item.productId, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => updateItem(item.productId, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
                <span className="cart-item-subtotal">
                  ${item.subtotal.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Express Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="btn btn-primary" style={{ width: "100%" }}>
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
