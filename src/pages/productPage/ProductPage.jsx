import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../api';
import { useCart } from '../../context/CartContext';
import calculateDiscount from '../../utils/calculateDiscount';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to load product. Please try again later.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  // Render loading state
  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }
  
  // Render error state
  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Product not found'}</p>
        <Link to="/" className="back-button">Back to Products</Link>
      </div>
    );
  }
  
  // Calculate discount if there is one
  const discount = calculateDiscount(product.price, product.discountedPrice);
  
  // Handle adding to cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    
    // Reset the "Added to Cart" message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };
  
  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  // Create star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return <div className="product-rating">{stars}</div>;
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image-container">
          <img 
            src={product.image.url} 
            alt={product.image.alt} 
            className="product-image"
          />
          
          {discount > 0 && (
            <div className="discount-badge">-{discount}%</div>
          )}
        </div>
        
        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          
          <div className="product-meta">
            {renderStars(product.rating)}
            
            {product.tags && product.tags.length > 0 && (
              <div className="product-tags">
                {product.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
          
          <div className="product-price-container">
            {discount > 0 && (
              <span className="original-price">${product.price.toFixed(2)}</span>
            )}
            <span className="product-price">${product.discountedPrice.toFixed(2)}</span>
          </div>
          
          <div className="product-description">
            <h2>Product Description</h2>
            <p>{product.description}</p>
          </div>
          
          <div className="product-actions">
            <div className="quantity-control">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            
            <button 
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            
            {addedToCart && (
              <div className="cart-success-message">
                Item added to cart!
              </div>
            )}
          </div>
          
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
      
      {product.reviews && product.reviews.length > 0 && (
        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          
          <div className="reviews-list">
            {product.reviews.map(review => (
              <div key={review.id} className="review">
                <div className="review-header">
                  <span className="reviewer-name">{review.username}</span>
                  <div className="review-rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="star filled">★</span>
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <span key={i + review.rating} className="star">☆</span>
                    ))}
                  </div>
                </div>
                <p className="review-text">{review.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;