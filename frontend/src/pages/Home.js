import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestProducts, getCategories } from '../utils/api';
import './Home.css';

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
      title: 'Welcome to E-Shop',
      subtitle: 'Your One-Stop Shopping Destination'
    },
    {
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200',
      title: 'Amazing Deals',
      subtitle: 'Up to 50% Off on Selected Items'
    },
    {
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200',
      title: 'New Arrivals',
      subtitle: 'Check Out Our Latest Products'
    }
  ];

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getLatestProducts(),
        getCategories()
      ]);
      setLatestProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="home">
      {/* Slider Section */}
      <section className="slider">
        <div className="slider-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <Link to="/products" className="btn-primary">Shop Now</Link>
              </div>
            </div>
          ))}
          <button className="slider-btn prev" onClick={prevSlide}>❮</button>
          <button className="slider-btn next" onClick={nextSlide}>❯</button>
          <div className="slider-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="category-card"
              >
                <img src={category.image} alt={category.name} />
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="latest-products-section">
        <div className="container">
          <h2 className="section-title">Latest Products</h2>
          <div className="products-grid">
            {latestProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.title} />
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <div className="product-rating">
                      {'⭐'.repeat(Math.round(product.rating))}
                      <span>({product.rating})</span>
                    </div>
                    <p className="product-price">${product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Shop With Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free shipping on orders over $50</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure payment methods</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Dedicated customer support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
