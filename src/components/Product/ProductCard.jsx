import { Link } from 'react-router-dom';
import './Product.css';
import calculateDiscount from '../../utils/calculateDiscount';

const ProductCard = ({ product }) => {
  const { 
    id, 
    title, 
    price, 
    discountedPrice, 
    image, 
    rating 
  } = product;
  
  // Calculate discount percentage if there is one
  const discount = calculateDiscount(price, discountedPrice);
  
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
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={image.url} 
          alt={image.alt} 
          className="product-image"
          loading="lazy"
        />
        
        {discount > 0 && (
          <div className="discount-badge">-{discount}%</div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        
        <div className="product-price-container">
          {discount > 0 && (
            <span className="original-price">${price.toFixed(2)}</span>
          )}
          <span className="product-price">${discountedPrice.toFixed(2)}</span>
        </div>
        
        {renderStars(rating)}
        
        <Link to={`/product/${id}`} className="view-product-button">
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;