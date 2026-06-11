# BookShelf – Backend

A REST API for an online bookstore. It powers the product catalog, categories, cart and wishlist, delivery addresses, and orders, built with Express, Node.js, and MongoDB.

## Live API

[https://book-shelf-backend-i1xg.vercel.app](https://book-shelf-backend-i1xg.vercel.app)

> Base URL for all endpoints below. When running locally, the server uses `http://localhost:3001`.

## Quick Start

```bash
git clone https://github.com/tanaymurade74/BookShelf-Backend.git
cd BookShelf-Backend
npm install
```

Create a `.env` file in the project root:

```env
MONGODB=your_mongodb_connection_string
```

Then start the server:

```bash
node index.js     # runs on http://localhost:3001
```

## Technologies

* Node.js
* Express
* MongoDB
* Mongoose

## Features

**Products**

* List all products, view a single product, and search products by name
* Filter products by category
* Add, update, and delete products

**Cart & Wishlist**

* Cart and wishlist state is tracked per product (`inCart`, `inWishlist`, `cartQuantity`)
* Fetch all items currently in the cart or wishlist

**Categories**

* List all categories and create new ones

**Addresses**

* Add, list, update, and delete delivery addresses

**Orders**

* Place an order and list all past orders

## API Reference

Base URL: the live API above, or `http://localhost:3001`.

### GET /api/products
List all products. Sample Response: `{ products: [ { _id, name, price, category, rating, ... } ] }`

### GET /api/products/:productId
Get a single product by ID. Sample Response: `{ product: [ { _id, name, price, ... } ] }`

### GET /api/product/search/:searchTerm
Search products by name. Sample Response: `{ products: [ ... ] }`

### GET /api/products/category/:categoryName
List products in a category. Sample Response: `{ products: [ ... ] }`

### POST /api/product
Add a new product. Body: `name`, `price`, `imageUrl`, `category`, `rating`, `description`.
Sample Response: `{ _id, name, price, ... }`

### POST /api/products/:productName
Update a product by name — e.g. toggle cart/wishlist or set quantity. Sample Response: `{ product: { ... } }`

### DELETE /api/product/:id
Delete a product. Sample Response: `{ product: { ... } }`

### GET /api/products/cart/:inCart · GET /api/products/wishlist/:inWishlist
Fetch products currently in the cart or wishlist (`true`/`false`). Sample Response: `{ products: [ ... ] }`

### GET /api/categories · POST /api/category
List all categories or create a new one. Sample Response: `{ Categories: [ { _id, category, categoryImage } ] }`

### GET /api/user/address · POST /api/user/address · POST /api/user/address/:addressId · DELETE /api/user/address/:addressId
List, add, update, and delete delivery addresses. Sample Response: `{ Addresses: [ { _id, block, street, city, state, pincode } ] }`

### GET /api/user/orders · POST /api/user/orders
List past orders or place a new one. Sample Response: `{ order: { _id, items, totalAmount, deliveryAddress, orderDate } }`
