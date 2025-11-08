# Quick Start Guide - E-Commerce Website

## 🚀 Get Started in 5 Minutes

### Step 1: Setup Database (2 minutes)
```bash
# Start MySQL (if not running)
# Windows: Start MySQL service from Services
# Mac: brew services start mysql  
# Linux: sudo systemctl start mysql

# Import database
mysql -u root -p < backend/config/schema.sql
```

### Step 2: Start Backend (1 minute)
```bash
cd backend
npm install
# Update .env file with your MySQL password if needed
npm start
```
✅ Backend running at http://localhost:5000

### Step 3: Start Frontend (2 minutes)
```bash
cd frontend
npm install  
npm start
```
✅ Website running at http://localhost:3000

---

## 🎯 Test the Website

### 1. Browse Products
- Visit http://localhost:3000
- Click "Products" in navbar
- Try filters (category, price range)

### 2. Add to Cart
- Click any product
- Select quantity
- Click "Add to Cart"
- View cart (icon in navbar)

### 3. Complete Purchase
- Go to cart
- Click "Proceed to Checkout"
- Fill shipping information
- Click "Place Order"
- View order confirmation

### 4. Try Other Features
- Search products (navbar search)
- Browse by category
- Contact form
- About Us page

---

## 📊 Sample Data Included

**5 Categories:**
- Electronics
- Clothing  
- Books
- Home & Garden
- Sports

**12 Products:**
- Wireless Headphones
- Smart Watch
- Laptop Computer
- Men's T-Shirt
- Women's Dress
- Running Shoes
- Fiction Novel
- Garden Tools Set
- Yoga Mat
- Bluetooth Speaker
- Jeans
- Coffee Maker

---

## 🔧 Troubleshooting

**Database connection error?**
→ Check MySQL is running and credentials in backend/.env

**Port 5000 already in use?**
→ Change PORT in backend/.env file

**Port 3000 already in use?**
→ React will prompt to use different port (Y)

**Cart not working?**
→ Make sure backend is running first

---

## 📁 Project Structure

```
website/
├── backend/           # Node.js API
│   ├── config/       # Database setup
│   ├── routes/       # API endpoints
│   └── server.js     # Main server
├── frontend/         # React app
│   └── src/
│       ├── components/  # Navbar, Footer, etc.
│       ├── pages/      # All 10 pages
│       └── utils/      # API helper
└── docs/            # Documentation
```

---

## 📖 Full Documentation

- **README.md** - Complete project documentation
- **SETUP.md** - Detailed setup instructions  
- **FEATURES.md** - Every feature explained

---

## ✅ All Features Working

✓ 10 Pages (Home, Products, Product View, Categories, Category, Cart, Checkout, Order Confirmation, About, Contact, Search)
✓ Navbar with search and cart
✓ Footer on all pages
✓ Scroll to top button
✓ Add to cart functionality
✓ Complete checkout flow
✓ Form validation (Contact page uses jQuery)
✓ Responsive design
✓ Sample data pre-loaded

---

## 🎉 Enjoy Your E-Commerce Website!

Everything is ready to use. Just follow the 3 steps above and start exploring!
