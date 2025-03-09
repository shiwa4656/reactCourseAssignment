// src/components/Header/Header.jsx
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import CartIcon from '../Cart/CartIcon';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">ShopWave</Link>
        </div>
        
        <div className="nav-cart-container">
          <Navigation />
          <CartIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;