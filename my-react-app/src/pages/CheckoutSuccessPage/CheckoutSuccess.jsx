import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CheckoutSuccessPage.css';

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();
  
  // Redirect to home if user tries to access this page directly
  useEffect(() => {
    const isFromCheckout = sessionStorage.getItem('checkoutCompleted');
    if (!isFromCheckout) {
      navigate('/');
    } else {
      // Clean up the session storage
      sessionStorage.removeItem('checkoutCompleted');
    }
  }, [navigate]);

  return (
    <div className="checkout-success-page">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order has been received and is being processed.</p>
        
        <div className="order-details">
          <p>Order confirmation has been sent to your email.</p>
          <p>Order reference: #{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
        
        <div className="action-buttons">
          <Link to="/" className="home-button">
            Continue Shopping
          </Link>
          <Link to="/contact" className="contact-button">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;