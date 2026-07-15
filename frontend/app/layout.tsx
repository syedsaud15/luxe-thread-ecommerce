import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "LUXE THREAD — Curated Fashion",
  description: "Premium clothing and accessories for the modern wardrobe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <footer className="footer">
            <div className="container footer-inner">
              <span className="footer-brand">Luxe Thread</span>
              <p className="footer-copy">
                &copy; 2026 Luxe Thread. All rights reserved.
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
