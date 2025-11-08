import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1 className="page-title">About Us</h1>

        <section className="about-intro">
          <div className="intro-content">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800" 
              alt="Our Store" 
            />
            <div className="intro-text">
              <h2>Welcome to E-Shop</h2>
              <p>
                At E-Shop, we are passionate about bringing you the best products at competitive prices. 
                Our mission is to provide a seamless online shopping experience with quality products 
                and exceptional customer service.
              </p>
              <p>
                Founded in 2024, we've grown from a small startup to a trusted online marketplace 
                serving thousands of customers worldwide. We carefully curate our product selection 
                to ensure we offer only the best quality items across various categories.
              </p>
            </div>
          </div>
        </section>

        <section className="about-features">
          <h2 className="section-title">What Makes Us Different</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Quality Products</h3>
              <p>
                We source products from trusted manufacturers and suppliers, ensuring you receive 
                only the highest quality items. Every product undergoes strict quality control.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>
                Our competitive pricing strategy ensures you get great value for your money. We 
                regularly offer discounts and special deals to our loyal customers.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fast Shipping</h3>
              <p>
                We partner with reliable shipping carriers to ensure your orders arrive quickly 
                and safely. Track your order every step of the way.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Shopping</h3>
              <p>
                Your security is our priority. We use industry-standard encryption to protect 
                your personal information and payment details.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Customer Support</h3>
              <p>
                Our dedicated customer support team is available 24/7 to assist you with any 
                questions or concerns. Your satisfaction is our goal.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">♻️</div>
              <h3>Easy Returns</h3>
              <p>
                Not satisfied with your purchase? Our hassle-free 30-day return policy makes it 
                easy to return or exchange items.
              </p>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Amazing shopping experience! The products arrived quickly and were exactly as 
                described. I'll definitely be shopping here again."
              </p>
              <div className="testimonial-author">
                <strong>Sarah Johnson</strong>
                <span>Verified Customer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Great prices and excellent customer service. When I had a question about my order, 
                their support team responded within minutes. Highly recommend!"
              </p>
              <div className="testimonial-author">
                <strong>Michael Chen</strong>
                <span>Verified Customer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The quality of products is outstanding. I've ordered multiple times and have 
                never been disappointed. E-Shop is now my go-to online store."
              </p>
              <div className="testimonial-author">
                <strong>Emily Rodriguez</strong>
                <span>Verified Customer</span>
              </div>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <h2>Ready to Start Shopping?</h2>
          <p>Join thousands of satisfied customers and discover amazing products today!</p>
          <a href="/products" className="btn-primary">Browse Products</a>
        </section>
      </div>
    </div>
  );
};

export default About;
