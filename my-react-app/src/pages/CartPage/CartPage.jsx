import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../../components/Cart/CartItem';
import { CartContext } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      // Use discountedPrice if available, otherwise use price
      const itemPrice = item.discountedPrice || item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };
  
  const handleCheckout = () => {
    // In a real application, you would implement payment processing here
    clearCart();
    navigate('/checkout-success');
  };
  
  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                onRemove={() => removeFromCart(item.id)}
                onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
              />
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>Items ({cart.reduce((count, item) => count + item.quantity, 0)})</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
            
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            
            <button className="clear-cart-button" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
          
          <div className="shopping-actions">
            <Link to="/" className="continue-shopping">
              &larr; Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;