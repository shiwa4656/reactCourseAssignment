// src/pages/CheckoutSuccessPage/CheckoutSuccessPage.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './CheckoutSuccessPage.css';

const CheckoutSuccessPage = () => {
  const { clearCart } = useCart();
  
  // Clear the cart when the success page loads
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  
  return (
    <div className="checkout-success">
      <div className="success-container">
        <div className="success-icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <h1>Order Successful!</h1>
        
        <p className="success-message">
          Thank you for your purchase! Your order has been successfully placed.
        </p>
        
        <p className="order-note">
          You will receive an email confirmation shortly.
        </p>
        
        <Link to="/" className="back-to-store">
          Back to Store
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;