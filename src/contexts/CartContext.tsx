import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem, CartContextType } from '@/types/store';
import { useToast } from '@/hooks/use-toast';

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.find(item => item.product.id === action.product.id);
      if (existingItem) {
        return state.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { product: action.product, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.product.id !== action.productId);
    case 'UPDATE_QUANTITY':
      if (action.quantity === 0) {
        return state.filter(item => item.product.id !== action.productId);
      }
      return state.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, []);
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getTotalItems = (): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (): number => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};