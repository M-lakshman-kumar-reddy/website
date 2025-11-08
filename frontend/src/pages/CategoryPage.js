import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategory } from '../utils/api';
import './CategoryPage.css';

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await getCategory(id);
      setCategory(response.data);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching category:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading category...</div>;
  }

  if (!category) {
    return <div className="error">Category not found</div>;
  }

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <img src={category.image} alt={category.name} />
          <div className="category-header-info">
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>
        </div>

        <div className="category-products">
          <h2>Products in {category.name}</h2>
          {products.length === 0 ? (
            <p className="no-products">No products available in this category</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
