# Shop (Next.js) — simple setup

A small Next.js + TypeScript e-commerce demo with Redux Toolkit (RTK Query) and shadcn-style UI.

## Quick start

```bash
# clone and start dev server
git clone https://github.com/aposte7/shop.git
npm install
npm run dev
# open http://localhost:3000
```

## What this project provides

-   Product listing with infinite scroll
-   Product detail (client component)
-   Favorites (persisted in localStorage)
-   RTK Query for data fetching
-   Small UI primitives and a global toast provider

## Key files

-   `src/app/` — routes & layouts
-   `src/features/products/` — API slice + product components
-   `src/features/favorites/` — favorites slice & client UI
-   `src/features/store.ts` — Redux store

## Favorites (client)

Favorites are stored in `localStorage` and managed by a Redux slice in `src/features/favorities/favoritiesSlice.ts`. The client UI and hooks live under `src/features/favorites` and are mounted inside the server page at `/favorites`.

![Favorites grid](/screenshots/favorites-grid.png)

## Product detail

Product detail logic (RTK Query calls, local state for images, add-to-cart behavior) is implemented in a client component `src/features/products/components/ProductDetail.tsx`. The route page (`src/app/(site)/product/[productId]/page.tsx`) is a thin server component that simply renders the client component.

![Product detail](/screenshots/product-detail.png)

![Reviews](/screenshots/reviews.png)

## Products list

The main product listing (infinite scroll) is implemented under `src/features/products`.

![Products grid](/screenshots/products-grid.png)
