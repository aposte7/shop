# Shop (Next.js) — Demo

A compact demo e-commerce app built with Next.js (App Router), React and TypeScript. It's intended as a reference project demonstrating product listing, detail pages, local favorites, and a tiny admin area.

Quick start

```bash
# clone
git clone https://github.com/aposte7/shop.git
cd shop
npm install
npm run dev
# open http://localhost:3000
```

What’s notable features

-   Search: live search input in the header
-   Category filters: category chips in the product list .
-   Favorites: quick add/remove favorites stored in localStorage and synced to Redux.
-   Admin demo: a basic admin area with product add/edit/delete flows..
-   RTK Query: products and categories use RTK Query with pagination and merged results for infinite scroll.
-   Demo login is available for the admin.
-   Sonner for notification
-   Show Error and Loading state

Screenshots

The repo includes screenshots under `public/screenshots`. Below are all available screenshots in the repository:

-   Products grid
    ![Products grid](/screenshots/products-grid.png)
-   Product detail
    ![Product detail](/screenshots/product-detail.png)
-   Reviews view
    ![Reviews](/screenshots/reviews.png)
-   Favorites
    ![Favorites grid](/screenshots/favorites-grid.png)
-   Admin product list
    ![Admin products](/screenshots/admin-products.png)
-   Add product (admin)
    ![Add product](/screenshots/add-product.png)
-   Delete product (admin)
    ![Delete product](/screenshots/delete-product.png)
-   Login (demo)
    ![Login](/screenshots/login.png)
-   Category filter in action
    ![Category filter](/screenshots/category-filter.png)
-   Search (header) example
    ![Search input](/screenshots/search-product.png)
