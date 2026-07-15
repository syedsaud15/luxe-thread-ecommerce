"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product.id);
  };

  return (
    <Link href={`/products/${product.id}`} className="product-card">
      <div className="product-card-image-wrap">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={650}
          className="product-card-image"
        />
        <span className="product-card-badge">{product.category}</span>
      </div>
      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
