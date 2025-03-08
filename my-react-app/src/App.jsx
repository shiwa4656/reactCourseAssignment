// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/layout.jsx';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Other routes will be added later */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;