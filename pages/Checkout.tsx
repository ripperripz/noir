import React, { useContext } from 'react';
import { CartContext } from '../App';
import { Button, TextReveal } from '../components/Shared';

export const Checkout: React.FC = () => {
  const { cart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="pt-32 min-h-screen container mx-auto px-6 md:px-12 bg-noir-black text-white pb-20">
      
      {/* Header */}
      <div className="flex flex-col items-start mb-24 border-b border-white/10 pb-8">
          <div className="flex justify-between w-full items-end">
             <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2 block">System // Secure Transaction</span>
                <TextReveal>
                    <h1 className="font-display text-5xl md:text-7xl leading-none">ORDER MANIFEST</h1>
                </TextReveal>
             </div>
             <span className="font-mono text-xs hidden md:block text-neutral-500">
                 [ {new Date().toLocaleDateString()} ]
             </span>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Form Section */}
          <div className="lg:col-span-7">
              <div className="mb-20">
                  <div className="flex items-center gap-4 mb-8">
                      <span className="font-mono text-xs border border-white/20 px-2 py-1">01</span>
                      <h2 className="font-serif italic text-2xl">Contact Information</h2>
                  </div>
                  <input 
                      type="email" 
                      placeholder="EMAIL ADDRESS" 
                      className="w-full bg-transparent border-b border-white/20 py-4 font-mono text-sm focus:outline-none focus:border-white transition-colors placeholder:text-neutral-700 text-white"
                  />
              </div>

              <div className="mb-20">
                  <div className="flex items-center gap-4 mb-8">
                      <span className="font-mono text-xs border border-white/20 px-2 py-1">02</span>
                      <h2 className="font-serif italic text-2xl">Shipping Destination</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8">
                      <input type="text" placeholder="FIRST NAME" className="w-full bg-transparent border-b border-white/20 py-4 font-mono text-sm focus:outline-none focus:border-white transition-colors placeholder:text-neutral-700 text-white" />
                      <input type="text" placeholder="LAST NAME" className="w-full bg-transparent border-b border-white/20 py-4 font-mono text-sm focus:outline-none focus:border-white transition-colors placeholder:text-neutral-700 text-white" />
                  </div>
                  <input type="text" placeholder="STREET ADDRESS" className="w-full bg-transparent border-b border-white/20 py-4 mb-8 font-mono text-sm focus:outline-none focus:border-white transition-colors placeholder:text-neutral-700 text-white" />
                  <div className="grid grid-cols-2 gap-8">
                      <input type="text" placeholder="CITY" className="w-full bg-transparent border-b border-white/20 py-4 font-mono text-sm focus:outline-none focus:border-white transition-colors placeholder:text-neutral-700 text-white" />
                      <input type="text" placeholder="POSTAL CODE" className="w-full bg-transparent border-b border-white/20 py-4 font-mono text-sm focus:outline-none focus:border-white transition-colors placeholder:text-neutral-700 text-white" />
                  </div>
              </div>

              <div className="mb-20 opacity-50 pointer-events-none">
                  <div className="flex items-center gap-4 mb-8">
                      <span className="font-mono text-xs border border-white/20 px-2 py-1">03</span>
                      <h2 className="font-serif italic text-2xl">Payment Gateway</h2>
                  </div>
                  <div className="p-8 border border-white/10 text-center font-mono text-xs uppercase tracking-widest text-neutral-500">
                      // Secure Payment Simulation Enabled //
                  </div>
              </div>

              <Button variant="solid" className="w-full bg-white text-black hover:bg-neutral-300">
                  Initate Transfer — ${total}
              </Button>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-5">
              <div className="sticky top-32 p-8 border border-white/10 bg-neutral-900/20 backdrop-blur-sm">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/10">Summary of Objects</h3>
                  
                  <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                      {cart.length === 0 ? (
                          <p className="text-center font-serif italic text-neutral-600">The void is empty.</p>
                      ) : (
                          cart.map((item, idx) => (
                              <div key={`${item.id}-${idx}`} className="flex gap-4">
                                  <div className="w-16 aspect-[3/4] bg-neutral-800">
                                      <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover grayscale" />
                                  </div>
                                  <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                          <h4 className="font-serif text-lg leading-none">{item.title}</h4>
                                          <span className="font-mono text-xs">${item.price}</span>
                                      </div>
                                      <p className="font-mono text-[9px] uppercase text-neutral-500 mt-2">
                                          {item.category} <br/>
                                          Variant: {item.selectedSize || 'Standard'}
                                      </p>
                                  </div>
                              </div>
                          ))
                      )}
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-3 font-mono text-xs uppercase tracking-wide">
                      <div className="flex justify-between text-neutral-400">
                          <span>Subtotal</span>
                          <span>${total}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                          <span>Shipping</span>
                          <span>[ Calculated ]</span>
                      </div>
                      <div className="flex justify-between text-sm text-white pt-4 border-t border-white/10">
                          <span>Total Required</span>
                          <span>${total}</span>
                      </div>
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
};