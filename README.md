# ShopEase - Simple E-Commerce Website

A full-stack e-commerce application built with **Next.js** (frontend), **Node.js/Express** (backend), and **CSS**.

## Features

- Product catalog with search and category filtering
- Product detail pages with quantity selection
- Shopping cart with add, update, and remove
- Checkout flow with order confirmation
- Responsive design with modern CSS

## Project Structure

```
├── backend/          # Node.js Express API server
│   ├── data/         # Product seed data
│   └── server.js     # API routes
├── frontend/         # Next.js React application
│   ├── app/          # Pages (App Router)
│   ├── components/   # Reusable UI components
│   ├── context/      # Cart state management
│   └── lib/          # API client & types
```

## Getting Started

### Prerequisites

- Node.js 18+ installed

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

The API server runs at **http://localhost:5000**

### 2. Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The website runs at **http://localhost:3000**

## API Endpoints

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/products`       | List all products    |
| GET    | `/api/products/:id`   | Get product by ID    |
| GET    | `/api/categories`     | List categories      |
| GET    | `/api/cart`           | Get cart contents    |
| POST   | `/api/cart`           | Add item to cart     |
| PUT    | `/api/cart/:productId`| Update cart quantity |
| DELETE | `/api/cart/:productId`| Remove from cart     |
| POST   | `/api/checkout`       | Place an order       |

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, CSS
- **Backend:** Node.js, Express, CORS
- **Images:** Unsplash (remote)
