"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts, getCategories } from "@/lib/api";
import type { Product } from "@/lib/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts(selectedCategory || undefined, search || undefined)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [selectedCategory, search]);

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <h1>The Collection</h1>
          <p>Explore our full range of curated fashion pieces</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="filters">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or style..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="category-filter">
              <button
                className={`category-btn ${selectedCategory === "" ? "active" : ""}`}
                onClick={() => setSelectedCategory("")}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading collection...</div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">◇</div>
              <h2>No pieces found</h2>
              <p>Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
