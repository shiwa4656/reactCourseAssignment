import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ProductPage from './pages/productPage/ProductPage';
import ContactPage from './pages/contactPage/ContactPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutSuccessPage from "./pages/checkoutSuccessPage/CheckoutSuccess";
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;