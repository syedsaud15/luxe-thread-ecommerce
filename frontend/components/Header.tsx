"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const { cart } = useCart();

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          Luxe Thread
        </Link>
        <nav className="nav">
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`nav-link ${pathname.startsWith("/products") ? "active" : ""}`}
          >
            Collection
          </Link>
          <Link href="/cart" className="cart-link">
            Bag ({cart.itemCount})
            {cart.itemCount > 0 && (
              <span className="cart-badge">{cart.itemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
