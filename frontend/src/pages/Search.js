import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProducts } from '../utils/api';
import './Search.css';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchTerm(query);
    if (query) {
      fetchSearchResults(query);
    } else {
      setLoading(false);
    }
  }, [location.search]);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      const response = await getProducts({ search: query });
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Searching products...</div>;
  }

  return (
    <div className="search-page">
      <div className="container">
        <div className="search-header">
          <h1>Search Results</h1>
          {searchTerm && (
            <p className="search-query">
              Showing results for: <strong>"{searchTerm}"</strong>
            </p>
          )}
          {!searchTerm && (
            <p className="search-query">
              Please enter a search term to find products
            </p>
          )}
        </div>

        {searchTerm && (
          <>
            {products.length === 0 ? (
              <div className="no-results">
                <p>No products found matching your search.</p>
                <Link to="/products" className="btn-primary">Browse All Products</Link>
              </div>
            ) : (
              <>
                <p className="results-count">Found {products.length} product(s)</p>
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
