
import { createContext, useContext, useReducer, useEffect } from 'react';

// Create the cart context
const CartContext = createContext();

// Action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

// Initial state
const initialState = {
  items: [],
  total: 0,
};

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  } catch (error) {
    console.error('Error loading cart from localStorage', error);
    return initialState;
  }
};

// Cart reducer
const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, update quantity
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        // If item doesn't exist, add it
        newState = {
          ...state,
          items: [...state.items, { ...product, quantity }],
        };
      }
      break;
    }
    
    case REMOVE_FROM_CART: {
      const { id } = action.payload;
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== id),
      };
      break;
    }
    
    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is zero or negative
        newState = {
          ...state,
          items: state.items.filter(item => item.id !== id),
        };
      } else {
        // Update quantity
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
        };
      }
      break;
    }
    
    case CLEAR_CART:
      newState = initialState;
      break;
      
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
  
  // Calculate the total price based on discountedPrice
  const total = newState.items.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  
  return { ...newState, total };
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, null, loadCartFromStorage);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Action creators
  const addToCart = (product, quantity = 1) => {
    dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
  };
  
  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { id } });
  };
  
  const updateQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  
  // Total count of items in the cart
  const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
  
  // Context value
  const value = {
    items: cart.items,
    total: cart.total,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;