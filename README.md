# Shop (Next.js) — demo

A minimal Next.js + TypeScript e-commerce demo. Small, focused feature set to explore product listing, detail pages, favorites, and a tiny admin area.

Quick start

```bash
# clone
git clone https://github.com/aposte7/shop.git
cd shop
npm install
npm run dev
# open http://localhost:3000
```

Key features

-   Products list with infinite scroll and quick add-to-cart UI
-   Product detail (client component) with images and reviews skeletons
-   Favorites stored in localStorage and managed with Redux
-   Admin area: product management table with add / edit / delete (demo)
-   RTK Query for data fetching and a global toast provider
-   Demo login: `demo@demo.com` / `demo123` (client-side demo auth)
-   Admin product screenshots below show the product table and add/delete flows.

## Admin

-   Admin area includes product management under `/admin/products` with add/edit/delete controls and a product table. See the short screenshots below for the admin product list and actions.

All screenshots

Below are all screenshots included in the repository showing the app's available functionality:

-   Products grid
    ![Products grid](https://raw.githubusercontent.com/aposte7/shop/main/public/screenshots/products-grid.png)
-   Product detail
    ![Product detail](https://raw.githubusercontent.com/aposte7/shop/main/public/screenshots/product-detail.png)
    ![Reviews](https://raw.githubusercontent.com/aposte7/shop/main/public/screenshots/reviews.png)
-   Favorites
    ![Favorites grid](https://raw.githubusercontent.com/aposte7/shop/main/public/screenshots/favorites-grid.png)
-   Admin product list
    ![Admin products](https://raw.githubusercontent.com/aposte7/shop/main/public/screenshots/admin-products.png)
-   Add product
    ![Add product](https://raw.githubusercontent.com/aposte7/shop/main/public/screenshots/add-product.png)
-   Delete product
    ![Delete product](https://raw.githubusercontent.com/aposte7/shop/main/public/screenshots/delete-product.png)
-   Login (demo)
    ![Login](https://raw.githubusercontent.com/aposte7/shop/main/public/screenshots/login.png)
