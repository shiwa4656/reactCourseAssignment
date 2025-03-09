import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, title, image, discountedPrice, quantity } = item;
  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(id);
  };
  
  const itemTotal = discountedPrice * quantity;
  
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image.url} alt={image.alt} />
      </div>
      
      <div className="cart-item-details">
        <Link to={`/product/${id}`} className="cart-item-title">
          {title}
        </Link>
        
        <div className="cart-item-price">
          ${discountedPrice.toFixed(2)}
        </div>
      </div>
      
      <div className="cart-item-controls">
        <div className="cart-quantity">
          <label htmlFor={`quantity-${id}`}>Qty:</label>
          <input
            type="number"
            id={`quantity-${id}`}
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        
        <div className="cart-item-total">
          ${itemTotal.toFixed(2)}
        </div>
        
        <button 
          className="remove-button"
          onClick={handleRemove}
          aria-label="Remove item"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;