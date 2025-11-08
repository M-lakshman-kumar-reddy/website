# E-Commerce Website - Setup Instructions

## Quick Start Guide

### 1. Database Setup

**Option A: Using MySQL Command Line**
```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
source /path/to/backend/config/schema.sql
```

**Option B: Using MySQL Workbench or phpMyAdmin**
1. Open MySQL Workbench or phpMyAdmin
2. Create a new database called `ecommerce_db`
3. Import the SQL file from `backend/config/schema.sql`
4. The file will create all necessary tables and insert sample data

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env and update credentials
cp .env.example .env

# Edit .env file with your MySQL credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=ecommerce_db
# PORT=5000

# Start the server
npm start
# For development with auto-reload:
npm run dev
```

The backend API will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at `http://localhost:3000`

## Testing the Application

1. **Access the website**: Open `http://localhost:3000` in your browser
2. **Browse products**: Navigate through different pages
3. **Add to cart**: Select products and add them to cart
4. **Complete checkout**: Fill in shipping information and place order
5. **View confirmation**: Check your order confirmation page

## Common Issues & Solutions

### Issue: Database Connection Error
**Solution**: Verify MySQL is running and credentials in `.env` are correct

### Issue: Port Already in Use
**Solution**: Change the PORT in backend `.env` file or kill the process using that port

### Issue: CORS Errors
**Solution**: Backend CORS is configured to allow all origins in development

### Issue: Cart Not Persisting
**Solution**: Cart is session-based using localStorage. Clear browser cache if issues persist

## Production Build

### Frontend Production Build
```bash
cd frontend
npm run build
```

The optimized production files will be in `frontend/build/` directory.

### Backend Production
For production, consider using:
- PM2 for process management
- Environment-specific configuration
- SSL certificates for HTTPS
- Nginx as reverse proxy

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce_db
PORT=5000
```

### Frontend
The frontend uses the hardcoded API URL `http://localhost:5000/api`. For production, update this in `frontend/src/utils/api.js`.

## Database Schema

The database includes these tables:
- `categories` - Product categories
- `products` - Product information
- `product_images` - Multiple images per product
- `cart` - Shopping cart items
- `orders` - Order information
- `order_items` - Order line items
- `contact_messages` - Contact form submissions

Sample data is automatically inserted when running the schema.

## API Documentation

See README.md for complete API endpoint documentation.

## Support

For issues or questions, refer to the main README.md or create an issue in the repository.
