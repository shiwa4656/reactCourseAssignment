import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/Cart/CartItem';
import './CartPage.css';

const CartPage = () => {
  const { items, total, itemCount } = useCart();
  
  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      
      {itemCount === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-button">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>Items ({itemCount}):</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            
            <div className="summary-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            
            <Link to="/" className="continue-shopping-link">
              Continue Shopping
            </Link>
            <Link to="/checkout-success" className="checkout-button">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;