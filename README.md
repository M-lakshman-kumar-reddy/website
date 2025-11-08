# E-Commerce Website

A complete e-commerce website built with React (frontend), Node.js (backend), and MySQL (database).

## Features

### Pages Implemented

1. **Home Page** - Sliders, Shop by Category, Latest Products, Features
2. **Products Page** - Products List, Category Filter, Price Range Filter
3. **Product View Page** - Product Details, Ratings, Related Products, Add to Cart
4. **Category Page** - Category List with Products
5. **Cart Page** - Cart Items Management, Quantity Control, Total Amount
6. **Checkout Page** - Order Summary, Shipping Information Form
7. **Order Confirmation Page** - Order Details, Order Number, Status
8. **About Us Page** - Company Info, Features, Testimonials
9. **Contact Us Page** - Contact Info, Contact Form with Validation
10. **Search Page** - Search Products Listing

### Common Components

- Navbar (with search and cart)
- Footer
- Scroll to Top Button

## Tech Stack

- **Frontend**: React, React Router, Axios, jQuery
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Styling**: CSS3 (Responsive Design)

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server

### Database Setup

1. Make sure MySQL is running
2. Create the database and tables:

```bash
mysql -u root -p < backend/config/schema.sql
```

Or manually run the SQL commands in `backend/config/schema.sql`

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update database credentials in `.env` file

4. Start the backend server:

```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/latest/all` - Get latest products

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category with products

### Cart
- `GET /api/cart/:sessionId` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item
- `DELETE /api/cart/session/:sessionId` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderNumber` - Get order details

### Contact
- `POST /api/contact` - Submit contact form

## Project Structure

```
website/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── schema.sql
│   ├── routes/
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── contact.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── ScrollToTop.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Products.js
│   │   │   ├── ProductView.js
│   │   │   ├── Categories.js
│   │   │   ├── CategoryPage.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── OrderConfirmation.js
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   └── Search.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Features Details

### Form Validation
- Contact form uses JavaScript & jQuery for validation
- Checkout form includes comprehensive validation

### Responsive Design
- Mobile-friendly layout
- Responsive navigation with hamburger menu
- Flexible grid layouts

### Cart Management
- Session-based cart storage
- Add/Remove/Update cart items
- Persistent cart across pages

### Order Management
- Complete checkout process
- Order confirmation with details
- Order tracking by order number

## License

ISC
