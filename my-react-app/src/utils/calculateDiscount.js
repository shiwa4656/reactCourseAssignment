// src/utils/calculateDiscount.js

/**
 * Calculates the discount percentage between original and discounted price
 * @param {number} originalPrice - The original price
 * @param {number} discountedPrice - The discounted price
 * @returns {number} The discount percentage as a whole number
 */
const calculateDiscount = (originalPrice, discountedPrice) => {
    // If there's no discount, return 0
    if (originalPrice <= discountedPrice) {
      return 0;
    }
    
    const discountAmount = originalPrice - discountedPrice;
    const discountPercentage = (discountAmount / originalPrice) * 100;
    
    // Round to the nearest whole number
    return Math.round(discountPercentage);
  };
  
  export default calculateDiscount;