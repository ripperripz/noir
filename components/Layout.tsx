import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { CartContext } from '../App';
import { Button, Magnetic } from './Shared';

export const FrameLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart, toggleCart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location]);

  const links = [
    { name: 'Index', path: '/', image: 'https://picsum.photos/id/1005/1920/1080' },
    { name: 'Catalog', path: '/shop', image: 'https://picsum.photos/id/338/1920/1080' },
    { name: 'Editorial', path: '/lookbook', image: 'https://picsum.photos/id/64/1920/1080' },
    { name: 'Profile', path: '/account', image: 'https://picsum.photos/id/435/1920/1080' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-noir-black text-white selection:bg-white selection:text-black">
      
      {/* --- Fixed Corners Navigation --- */}
      
      {/* Top Left: Logo */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference">
        <Magnetic>
            <Link to="/" className="block group">
            <h1 className="font-display font-bold text-2xl tracking-tighter leading-none group-hover:scale-110 transition-transform origin-left">NOIR.</h1>
            <span className="text-[8px] uppercase tracking-[0.3em] opacity-50 hidden group-hover:block animate-fade-in absolute top-full mt-1">Archive</span>
            </Link>
        </Magnetic>
      </div>

      {/* Top Right: Cart & Menu */}
      <div className="fixed top-8 right-8 z-50 mix-blend-difference flex items-center gap-8">
        <Magnetic>
            <button onClick={() => setMenuOpen(!menuOpen)} className="uppercase text-[10px] tracking-[0.2em] font-semibold hover:line-through decoration-white px-2 py-1">
            {menuOpen ? 'Close' : 'Menu'}
            </button>
        </Magnetic>
        
        <Magnetic>
            <button onClick={toggleCart} className="flex items-center gap-2 group px-2 py-1">
            <span className="uppercase text-[10px] tracking-[0.2em] group-hover:opacity-100 opacity-50 transition-opacity">Bag</span>
            <span className="bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-sm">
                {cart.length}
            </span>
            </button>
        </Magnetic>
      </div>

      {/* Bottom Left: Coordinates/Info */}
      <div className="fixed bottom-8 left-8 z-40 hidden md:block mix-blend-difference">
        <div className="flex flex-col text-[9px] uppercase tracking-[0.2em] font-mono opacity-50 leading-loose">
          <span>LAT 40.7128° N</span>
          <span>LON 74.0060° W</span>
          <span className="mt-2">Sys.Online</span>
        </div>
      </div>

      {/* Bottom Right: Scroll Indicator */}
      <div className="fixed bottom-8 right-8 z-40 hidden md:flex items-center gap-4 mix-blend-difference opacity-50">
        <span className="text-[9px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-12 bg-white animate-pulse" />
      </div>

      {/* --- Full Screen Menu --- */}
      <div className={`fixed inset-0 bg-noir-black z-40 transition-all duration-1000 cubic-bezier(0.77,0,0.175,1) ${menuOpen ? 'clip-open' : 'clip-close pointer-events-none'}`} style={{ clipPath: menuOpen ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)' }}>
         
         {/* Background Image Reveal */}
         <div className="absolute inset-0 z-0 opacity-30 transition-opacity duration-700">
            {links.map((link) => (
                <img 
                    key={link.name} 
                    src={link.image} 
                    className={`absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-700 ${hoveredLink === link.name ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                    alt=""
                />
            ))}
             <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
         </div>

         <div className="h-full w-full flex flex-col justify-center items-center relative z-10">
            <nav className="flex flex-col items-center">
              {links.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-6xl md:text-8xl lg:text-9xl group relative overflow-hidden block mix-blend-difference text-white"
                >
                  <div className="transition-transform duration-500 ease-[0.19,1,0.22,1] group-hover:-translate-y-1/2 flex flex-col items-center">
                      <span className="block py-4">{link.name}</span>
                      <span className="block py-4 italic font-serif text-neutral-400">{link.name}</span>
                  </div>
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-12 flex gap-8 text-[10px] uppercase tracking-[0.2em] mix-blend-difference text-white">
               <a href="#" className="hover:underline">Instagram</a>
               <a href="#" className="hover:underline">Support</a>
            </div>
         </div>
      </div>

      {/* --- Main Content --- */}
      <main className="relative z-10">
        {children}
      </main>

      {/* --- Footer (In Flow) --- */}
      <footer className="bg-white text-black py-20 px-6 md:px-12 mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
               <h2 className="font-display text-4xl mb-6">NOIR.</h2>
               <p className="font-mono text-xs opacity-60 leading-relaxed max-w-xs">
                 Constructing the silence between noise. An experimental archive of fashion, form, and function.
               </p>
            </div>
            <div className="flex flex-col gap-2 font-mono text-xs uppercase">
                <span className="mb-4 font-bold tracking-widest">Sitemap</span>
                <Link to="/shop">Collection</Link>
                <Link to="/lookbook">Journal</Link>
                <Link to="/account">Login</Link>
            </div>
            <div className="flex flex-col gap-2 font-mono text-xs uppercase">
                <span className="mb-4 font-bold tracking-widest">Legal</span>
                <Link to="#">Terms</Link>
                <Link to="#">Privacy</Link>
                <Link to="#">Returns</Link>
            </div>
            <div>
               <h4 className="font-mono text-xs uppercase font-bold tracking-widest mb-4">Newsletter</h4>
               <div className="flex border-b border-black pb-2">
                 <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent w-full text-xs font-mono focus:outline-none placeholder:text-black/40" />
                 <button className="uppercase text-[10px] font-bold">Submit</button>
               </div>
            </div>
        </div>
        <div className="mt-20 pt-8 border-t border-black/10 flex justify-between font-mono text-[10px] uppercase">
           <span>© 2025 NOIR. Copyright by Arsh Bhattarai</span>
        </div>
      </footer>
    </div>
  );
};

export const CartSidebar: React.FC = () => {
  const { cart, removeFromCart, toggleCart, isCartOpen } = useContext(CartContext) as any; 
  const total = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        onClick={toggleCart} 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      <div className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#f4f4f4] text-black z-[70] transition-transform duration-700 cubic-bezier(0.77,0,0.175,1) ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
            <div className="p-8 border-b border-black/10 flex justify-between items-center bg-white">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em]">Cart Manifest ({cart.length})</h2>
                <button onClick={toggleCart}><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
               {cart.length === 0 ? (
                   <div className="h-full flex items-center justify-center font-mono text-xs uppercase text-gray-400">
                       [ Empty Archive ]
                   </div>
               ) : (
                   cart.map((item: any) => (
                       <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 relative group">
                           <div className="w-24 aspect-[3/4] bg-gray-200">
                               <img src={item.images[0]} className="w-full h-full object-cover mix-blend-multiply" />
                           </div>
                           <div className="flex-1 py-1">
                               <div className="flex justify-between items-start">
                                   <h3 className="font-serif text-xl">{item.title}</h3>
                                   <span className="font-mono text-sm">${item.price}</span>
                               </div>
                               <p className="font-mono text-[10px] uppercase text-gray-500 mt-2">
                                   Variant: {item.selectedSize || 'OS'} <br/>
                                   Qty: {item.quantity}
                               </p>
                               <button 
                                onClick={() => removeFromCart(item.id)}
                                className="absolute bottom-1 right-0 text-[10px] uppercase underline decoration-gray-300 hover:decoration-black transition-all"
                               >
                                   Remove
                               </button>
                           </div>
                       </div>
                   ))
               )}
            </div>

            <div className="p-8 bg-white border-t border-black/10">
                <div className="flex justify-between font-mono text-sm uppercase mb-6">
                    <span>Subtotal</span>
                    <span>${total}</span>
                </div>
                <Link to="/checkout" onClick={toggleCart}>
                    <Button variant="solid" className="w-full bg-black text-white hover:bg-neutral-800">Proceed to Checkout</Button>
                </Link>
            </div>
        </div>
      </div>
    </>
  );
};