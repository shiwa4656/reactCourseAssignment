// src/api/index.js

const BASE_URL = 'https://v2.api.noroff.dev';

/**
 * Fetches all products from the online shop API
 * @returns {Promise} Promise that resolves to the product data
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/online-shop`);
    
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetches a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise} Promise that resolves to the product data
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/online-shop/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};