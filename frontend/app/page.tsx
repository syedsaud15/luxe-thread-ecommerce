"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((products: Product[]) => setFeatured(products.slice(0, 4)))
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="hero-banner">
        <div className="hero-banner-bg" />
        <div className="hero-banner-overlay" />
        <div className="container hero-banner-content">
          <span className="hero-eyebrow">Spring / Summer 2026</span>
          <h1>
            Curated Style for the <em>Modern</em> Wardrobe
          </h1>
          <p>
            Discover timeless pieces crafted from premium fabrics — where
            effortless elegance meets contemporary design.
          </p>
          <div className="hero-actions">
            <Link href="/products" className="btn btn-accent">
              Shop Collection
            </Link>
            <Link href="/products" className="btn btn-secondary">
              New Arrivals
            </Link>
          </div>
        </div>
        <div className="hero-scroll-hint">Scroll</div>
      </section>

      <div className="category-strip">
        <div className="container category-strip-inner">
          <Link href="/products" className="category-strip-item">Dresses</Link>
          <Link href="/products" className="category-strip-item">Outerwear</Link>
          <Link href="/products" className="category-strip-item">Tops</Link>
          <Link href="/products" className="category-strip-item">Bottoms</Link>
          <Link href="/products" className="category-strip-item">Footwear</Link>
          <Link href="/products" className="category-strip-item">Accessories</Link>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Featured</p>
            <h2 className="section-title">This Season&apos;s Essentials</h2>
            <p className="section-subtitle">
              Handpicked styles to elevate your everyday look.
            </p>
          </div>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/products" className="btn btn-outline">
              View All Pieces
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Why LUXE THREAD</p>
            <h2 className="section-title">The Art of Dressing Well</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✦</div>
              <h3>Curated Collections</h3>
              <p>
                Every piece is thoughtfully selected for quality, fit, and
                lasting style.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✦</div>
              <h3>Premium Materials</h3>
              <p>
                Silk, cashmere, Italian leather — only the finest fabrics make
                the cut.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✦</div>
              <h3>Complimentary Shipping</h3>
              <p>
                Free express delivery on all orders. Unbox luxury at your
                doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
