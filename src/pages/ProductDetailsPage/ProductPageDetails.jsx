import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../../components/Product/ProductDetail';
import ReviewList from '../../components/Review/ReviewList';
import { CartContext } from '../../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/online-shop/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Oops!</h2>
        <p>{error || 'Product not found'}</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button className="back-button" onClick={handleGoBack}>
        &larr; Back
      </button>
      
      <div className="product-container">
        <ProductDetail 
          product={product} 
          onAddToCart={handleAddToCart} 
        />
      </div>
      
      <div className="reviews-section">
        <h2>Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <ReviewList reviews={product.reviews} />
        ) : (
          <p className="no-reviews">No reviews yet for this product.</p>
        )}
      </div>
      
      <div className="related-tags">
        {product.tags && product.tags.length > 0 && (
          <div>
            <h3>Tags:</h3>
            <div className="tags-container">
              {product.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;