-- Create Database
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT,
  image VARCHAR(500),
  rating DECIMAL(2, 1) DEFAULT 0,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Product Images Table (for multiple images)
CREATE TABLE IF NOT EXISTS product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Cart Table
CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  shipping_address TEXT NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(20),
  country VARCHAR(100),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Categories
INSERT INTO categories (name, image, description) VALUES
('Electronics', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', 'Latest electronic gadgets and devices'),
('Clothing', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', 'Fashion and apparel for all'),
('Books', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400', 'Wide range of books and literature'),
('Home & Garden', 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400', 'Home improvement and gardening supplies'),
('Sports', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400', 'Sports equipment and accessories');

-- Insert Sample Products
INSERT INTO products (title, description, price, category_id, image, rating, stock) VALUES
('Wireless Headphones', 'Premium wireless headphones with noise cancellation and superior sound quality', 149.99, 1, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 4.5, 50),
('Smart Watch', 'Feature-packed smartwatch with fitness tracking and notifications', 299.99, 1, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', 4.7, 30),
('Laptop Computer', 'High-performance laptop for work and entertainment', 899.99, 1, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 4.6, 20),
('Men\'s T-Shirt', 'Comfortable cotton t-shirt in multiple colors', 29.99, 2, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 4.3, 100),
('Women\'s Dress', 'Elegant dress perfect for any occasion', 79.99, 2, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', 4.4, 45),
('Running Shoes', 'Lightweight running shoes for optimal performance', 89.99, 5, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 4.8, 60),
('Fiction Novel', 'Bestselling fiction novel by renowned author', 19.99, 3, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 4.2, 80),
('Garden Tools Set', 'Complete set of essential gardening tools', 49.99, 4, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', 4.1, 35),
('Yoga Mat', 'Non-slip yoga mat for comfortable practice', 34.99, 5, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', 4.5, 70),
('Bluetooth Speaker', 'Portable Bluetooth speaker with excellent sound', 59.99, 1, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', 4.4, 55),
('Jeans', 'Classic denim jeans for everyday wear', 59.99, 2, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 4.3, 65),
('Coffee Maker', 'Programmable coffee maker for perfect brew', 79.99, 4, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', 4.6, 40);
