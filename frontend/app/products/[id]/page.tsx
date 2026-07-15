"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";

export default function ProductDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="loading container">Loading piece...</div>;
  }

  if (!product) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">◇</div>
        <h2>Piece not found</h2>
        <Link href="/products" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Back to Collection
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product.id, quantity);
  };

  return (
    <div className="container product-detail">
      <div className="product-detail-image-wrap">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={800}
          className="product-detail-image"
        />
      </div>
      <div className="product-detail-info">
        <span className="product-category">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <p className="product-detail-desc">{product.description}</p>
        <p className="stock-info">
          {product.stock > 0 ? (
            <span className="in-stock">{product.stock} available</span>
          ) : (
            <span className="out-of-stock">Sold out</span>
          )}
        </p>

        <div className="quantity-selector">
          <span>Quantity</span>
          <button
            className="quantity-btn"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            −
          </button>
          <span className="quantity-value">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          >
            +
          </button>
        </div>

        <div className="detail-actions">
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
          <Link href="/cart" className="btn btn-outline">
            View Bag
          </Link>
        </div>
      </div>
    </div>
  );
}
