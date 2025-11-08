import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductView from './pages/ProductView';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import Search from './pages/Search';
import { getCart, getSessionId } from './utils/api';
import './App.css';

function App() {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const sessionId = getSessionId();
      const response = await getCart(sessionId);
      setCartItemCount(response.data.length);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const handleCartUpdate = () => {
    fetchCartCount();
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartItemCount={cartItemCount} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductView onCartUpdate={handleCartUpdate} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart onCartUpdate={handleCartUpdate} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
