// src/pages/HomePage/HomePage.jsx
import { useState, useEffect } from 'react';
import { getAllProducts } from '../../api';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductCard from '../../components/Product/ProductCard';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Handle search input change
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Our Products</h1>
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
      </div>

      {loading && <div className="loading">Loading products...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="no-products">
          No products found matching "{searchTerm}".
        </div>
      )}
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;