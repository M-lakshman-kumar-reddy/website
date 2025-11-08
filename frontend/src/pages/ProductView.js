import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, addToCart, getSessionId } from '../utils/api';
import './ProductView.css';

const ProductView = ({ onCartUpdate }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await getProduct(id);
      setProduct(response.data);
      setRelatedProducts(response.data.relatedProducts || []);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      const sessionId = getSessionId();
      await addToCart(sessionId, id, quantity);
      setMessage('Product added to cart successfully!');
      if (onCartUpdate) onCartUpdate();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding product to cart');
      console.error('Error:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-view-page">
      <div className="container">
        {message && <div className="message success">{message}</div>}

        <div className="product-details">
          <div className="product-image-section">
            <img src={product.image} alt={product.title} />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.title}</h1>
            
            <div className="product-rating">
              {'⭐'.repeat(Math.round(product.rating))}
              <span>({product.rating} out of 5)</span>
            </div>

            <p className="product-price">${product.price}</p>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-meta">
              <p><strong>Category:</strong> {product.category_name}</p>
              <p><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}</p>
            </div>

            {product.stock > 0 && (
              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max={product.stock}
                  />
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
                </div>

                <button
                  className="btn-add-to-cart"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <h2>Related Products</h2>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="product-card">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <img src={relatedProduct.image} alt={relatedProduct.title} />
                    <div className="product-info">
                      <h3>{relatedProduct.title}</h3>
                      <div className="product-rating">
                        {'⭐'.repeat(Math.round(relatedProduct.rating))}
                      </div>
                      <p className="product-price">${relatedProduct.price}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductView;
