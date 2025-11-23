import React, { createContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Product, CartItem } from './types';
import { FrameLayout, CartSidebar } from './components/Layout';
import { GrainOverlay, CustomCursor, Preloader } from './components/Shared';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/Product';
import { Lookbook } from './pages/Lookbook';
import { Checkout } from './pages/Checkout';
import { Account } from './pages/Account';

// --- Context ---
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string) => void;
  toggleCart: () => void;
  isCartOpen: boolean;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  toggleCart: () => {},
  isCartOpen: false,
});

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, size?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, toggleCart, isCartOpen }}>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <Router>
          <ScrollToTop />
          <GrainOverlay />
          <CustomCursor />
          
          <FrameLayout>
             <CartSidebar />
             <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/lookbook" element={<Lookbook />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/account" element={<Account />} />
                <Route path="*" element={<Home />} />
             </Routes>
          </FrameLayout>
          
        </Router>
      )}
    </CartContext.Provider>
  );
};

export default App;