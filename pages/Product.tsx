import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { CartContext } from '../App';
import { Button, TextReveal, Magnetic } from '../components/Shared';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-noir-black text-white">
      
      {/* --- Sticky Sidebar Info (Desktop) --- */}
      <div className="lg:fixed lg:top-0 lg:right-0 lg:w-1/3 h-auto lg:h-full z-20 flex flex-col justify-center p-8 lg:p-16 bg-noir-black/90 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none border-l border-white/10">
          <div className="mb-auto pt-24 lg:pt-0">
             <Magnetic>
                <button onClick={() => navigate('/shop')} className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white mb-8 block transition-colors">
                    ← Back to Archive
                </button>
             </Magnetic>
             
             <TextReveal>
                <h1 className="font-display text-5xl lg:text-7xl mb-4 leading-[0.9]">{product.title}</h1>
             </TextReveal>
             <p className="font-serif italic text-xl text-neutral-400 mb-8">{product.subtitle}</p>
             <p className="font-mono text-2xl mb-8 border-b border-white/10 pb-4 inline-block">${product.price} USD</p>
             
             <div className="font-sans text-neutral-300 leading-relaxed text-sm max-w-md mb-12">
                 {product.description}
                 <br/><br/>
                 <span className="text-neutral-500 italic font-serif">"{product.story}"</span>
             </div>
          </div>

          <div className="mt-auto bg-noir-black pb-8 lg:pb-0">
              {product.sizes && (
                  <div className="mb-8">
                      <span className="font-mono text-[10px] uppercase text-neutral-500 mb-4 block">Select Size</span>
                      <div className="flex gap-4">
                          {product.sizes.map(size => (
                              <button
                                  key={size}
                                  onClick={() => setSelectedSize(size)}
                                  className={`w-12 h-12 border flex items-center justify-center transition-all duration-300 ${selectedSize === size ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:border-white'} font-mono text-sm`}
                              >
                                  {size}
                              </button>
                          ))}
                      </div>
                  </div>
              )}
              
              <Magnetic>
                  <Button 
                    variant="solid"
                    className="w-full bg-white text-black hover:bg-neutral-300"
                    onClick={() => {
                        if (product.sizes && !selectedSize) {
                            alert('Please select a size');
                            return;
                        }
                        addToCart(product, selectedSize);
                    }}
                  >
                      Add to Cart
                  </Button>
              </Magnetic>
          </div>
      </div>

      {/* --- Scrollable Images (Left Side) --- */}
      <div className="lg:w-2/3 w-full">
          {product.images.map((img, index) => (
              <div key={index} className="h-screen w-full relative sticky top-0 overflow-hidden border-b border-white/5 group">
                  <div className="w-full h-full overflow-hidden">
                    <img 
                        src={img} 
                        alt="" 
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-125" 
                    />
                  </div>
                  
                  {/* Technical Overlays */}
                  <div className="absolute bottom-8 left-8 font-mono text-[10px] uppercase mix-blend-difference">
                      Image 0{index + 1} / Detail View
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 pointer-events-none flex items-center justify-center backdrop-blur-sm">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-white">Zoom</span>
                  </div>
              </div>
          ))}
          
          <div className="h-[50vh] flex items-center justify-center p-12 bg-neutral-900">
              <div className="text-center">
                  <h3 className="font-display text-4xl mb-4">Materiality</h3>
                  <p className="font-serif italic text-neutral-400 max-w-md mx-auto leading-loose">
                      Constructed from raw materials sourced from the edge of the world. 
                      Imperfect, durable, and timeless.
                  </p>
                  <div className="mt-12 flex justify-center gap-12 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                      <span>Ethical Sourcing</span>
                      <span>Hand Finished</span>
                      <span>Ltd Edition</span>
                  </div>
              </div>
          </div>
      </div>

    </div>
  );
};