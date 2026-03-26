# 🛒 FreshCart — E‑Commerce Web App (Next.js + TypeScript)

A modern, responsive e‑commerce experience built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.  
FreshCart includes real shopping flows: authentication, product browsing, cart/wishlist, checkout, orders, and profile management.

---

## ✨ Tech Stack (with icons)

<p align="center">
  <!-- Core -->
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,redux" alt="Next.js React TypeScript Tailwind Redux" />
</p>

<p align="center">
  <!-- Tooling -->
  <img src="https://skillicons.dev/icons?i=nodejs,eslint,postcss" alt="Node.js ESLint PostCSS" />
</p>

### Libraries used in this project
- **Next.js** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Redux Toolkit** + **React Redux**
- **Axios**
- **React Hook Form** + **Zod**
- **AOS** (Animate on Scroll)
- **React Toastify**
- **SweetAlert2**
- **Swiper**
- **Font Awesome**
- **React Image Gallery**

---

## ✅ Features

### 🧑‍💻 Accounts & Security
- Sign up / login
- Email verification
- Forgot password / reset password
- Protected routes (token-based)

### 🛍️ Shopping Experience
- Browse products, categories, and brands
- Search + filtering
- Product details + gallery + reviews
- Cart management (add / remove / update quantities)
- Wishlist (works for logged-in users and guests)

### 💳 Orders
- Checkout flow
- Order history + order details

### 🌍 UI/UX
- Fully responsive layout
- Arabic support
- Smooth animations (AOS)
- Toast notifications + modal alerts

---

## 🧭 Pages Overview

- Home
- Products
- Product Details
- Categories
- Brands
- Cart
- Wishlist
- Checkout
- Orders
- Profile
- Auth (Sign up / Login / Verify / Reset)
- About / Contact / Privacy Policy / Terms
- Not Found

---

## 🚀 Getting Started

### 1) Install dependencies
```bash
npm install
# or
yarn install
```

### 2) Run development server
```bash
npm run dev
# or
yarn dev
```

Then open: `http://localhost:3000`

### 3) Build for production
```bash
npm run build
npm start
```

---

## 🗂️ Project Structure (high level)

- `src/app/` — routes & pages (Next.js App Router)
- `src/components/` — shared UI components
- `src/features/` — feature modules (auth, cart, products, wishlist, orders, ...)
- `src/store/` — Redux store setup
- `src/utils/` — helpers (ex: localStorage utilities)
- `src/styles/` — global styling setup
- `public/` — static assets

---

## 🧪 Scripts

```bash
npm run dev      # start dev server
npm run build    # build for production
npm start        # run production server
npm run lint     # lint code
```

---

## 📌 Notes

- Guests can use cart/wishlist via **localStorage**.
- Some pages require authentication (protected routes).

---

## 📄 License

This project is currently unlicensed (add a LICENSE file if you want to open-source it).