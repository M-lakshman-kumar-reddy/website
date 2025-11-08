import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../utils/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, minPrice, maxPrice]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (selectedCategory) filters.category = selectedCategory;
      if (minPrice) filters.minPrice = minPrice;
      if (maxPrice) filters.maxPrice = maxPrice;

      const response = await getProducts(filters);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceFilter = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">Our Products</h1>

        <div className="products-layout">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>Category Filter</h3>
              <div className="category-filter">
                <label>
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  All Categories
                </label>
                {categories.map((category) => (
                  <label key={category.id}>
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id.toString()}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    {category.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Price Range Filter</h3>
              <form onSubmit={handlePriceFilter}>
                <div className="price-inputs">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                  />
                </div>
                <button type="submit" className="btn-filter">Apply</button>
              </form>
            </div>

            <button onClick={resetFilters} className="btn-reset">
              Reset Filters
            </button>
          </aside>

          {/* Products Grid */}
          <div className="products-content">
            {loading ? (
              <div className="loading">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="no-products">No products found</div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt={product.title} />
                      <div className="product-info">
                        <h3>{product.title}</h3>
                        <p className="category-name">{product.category_name}</p>
                        <div className="product-rating">
                          {'⭐'.repeat(Math.round(product.rating))}
                          <span>({product.rating})</span>
                        </div>
                        <p className="product-price">${product.price}</p>
                        {product.stock > 0 ? (
                          <span className="in-stock">In Stock</span>
                        ) : (
                          <span className="out-of-stock">Out of Stock</span>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
