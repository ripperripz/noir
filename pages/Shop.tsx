import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Category } from '../types';
import { ImageReveal, CursorImagePreview } from '../components/Shared';
import { LayoutGrid, List } from 'lucide-react';

export const Shop: React.FC = () => {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProductImg, setHoveredProductImg] = useState<string | null>(null);

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="pt-32 min-h-screen w-full px-6 md:px-12 pb-20 bg-noir-black text-white relative">
      <CursorImagePreview src={viewMode === 'list' ? hoveredProductImg : null} />

      {/* --- Header & Filter --- */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-24 sticky top-0 bg-noir-black/90 backdrop-blur z-30 pt-8 pb-8 border-b border-white/10 transition-all duration-500">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="font-display text-7xl md:text-[8vw] leading-[0.8]">ARCHIVE</h1>
              <p className="font-mono text-xs text-neutral-400 mt-2 tracking-widest">[ {filteredProducts.length} Objects Found ]</p>
          </div>
          
          <div className="mt-8 md:mt-0 flex flex-col items-end gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              
              {/* View Toggle */}
              <div className="flex gap-4 border border-white/10 p-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
                  >
                      <LayoutGrid size={16} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}
                  >
                      <List size={16} />
                  </button>
              </div>

              {/* Filter */}
              <div className="flex flex-col items-end gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 mb-2">Filter By Category</span>
                <div className="flex flex-wrap justify-end gap-6">
                    {['All', ...Object.values(Category)].filter(c => c !== Category.EDITORIAL).map((cat) => (
                        <button 
                            key={cat} 
                            onClick={() => setFilter(cat as any)}
                            className={`font-mono text-xs uppercase tracking-widest hover:text-white transition-all duration-300 relative ${filter === cat ? 'text-white' : 'text-neutral-600'}`}
                        >
                            {cat}
                            {filter === cat && <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white" />}
                        </button>
                    ))}
                </div>
              </div>
          </div>
      </div>

      {/* --- Content Area --- */}
      {viewMode === 'grid' ? (
          /* Chaos Grid Layout */
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-24 md:space-y-32">
              {filteredProducts.map((product, index) => (
                  <Link 
                    to={`/product/${product.id}`} 
                    key={product.id} 
                    className={`block break-inside-avoid group relative ${index % 2 === 0 ? 'md:mt-0' : 'md:mt-24'}`}
                  >
                      {/* Dynamic Aspect Ratios */}
                      <div className={`relative w-full bg-neutral-900 mb-6 overflow-hidden ${index % 3 === 0 ? 'aspect-[3/4]' : index % 2 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}>
                          <ImageReveal src={product.images[0]} alt={product.title} className="w-full h-full" />
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-4">
                              <div className="w-full h-full border border-white/20 scale-95 group-hover:scale-100 transition-transform duration-500 flex flex-col items-center justify-center">
                                <span className="font-display text-4xl italic mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white mix-blend-difference">{product.title}</span>
                                <span className="font-mono text-[10px] uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 bg-white text-black px-3 py-1 mt-4">Inspect</span>
                              </div>
                          </div>
                      </div>
                      
                      <div className="flex justify-between items-end px-1 border-b border-transparent group-hover:border-white/20 pb-4 transition-colors duration-500">
                          <div className="flex flex-col">
                              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest mb-1">0{index + 1} // {product.category}</span>
                              <span className="font-serif text-2xl group-hover:italic transition-all duration-300">{product.title}</span>
                          </div>
                          <span className="font-mono text-sm text-neutral-400">${product.price}</span>
                      </div>
                  </Link>
              ))}
          </div>
      ) : (
          /* Brutalist List Layout */
          <div className="w-full border-t border-white/10">
              {/* Table Header */}
              <div className="grid grid-cols-12 py-4 border-b border-white/10 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-5 md:col-span-4">Object Name</div>
                  <div className="col-span-3 hidden md:block">Category</div>
                  <div className="col-span-3 md:col-span-2 text-right">Price</div>
                  <div className="col-span-3 md:col-span-2 text-right">Action</div>
              </div>

              {/* Rows */}
              {filteredProducts.map((product, index) => (
                  <Link 
                    to={`/product/${product.id}`} 
                    key={product.id}
                    className="grid grid-cols-12 py-8 border-b border-white/10 items-center group hover:bg-neutral-900/30 transition-colors cursor-pointer"
                    onMouseEnter={() => setHoveredProductImg(product.images[0])}
                    onMouseLeave={() => setHoveredProductImg(null)}
                  >
                      <div className="col-span-1 font-mono text-xs text-neutral-500">
                          {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="col-span-5 md:col-span-4">
                          <h3 className="font-display text-2xl md:text-4xl group-hover:translate-x-4 transition-transform duration-500 ease-out">{product.title}</h3>
                          <span className="font-mono text-[9px] text-neutral-500 hidden md:inline-block mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 uppercase tracking-widest">
                              {product.subtitle}
                          </span>
                      </div>
                      <div className="col-span-3 hidden md:block font-mono text-xs uppercase text-neutral-400">
                          {product.category}
                      </div>
                      <div className="col-span-3 md:col-span-2 text-right font-mono text-sm">
                          ${product.price} USD
                      </div>
                      <div className="col-span-3 md:col-span-2 text-right flex justify-end">
                         <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                             <span className="text-xl leading-none mb-1">↗</span>
                         </div>
                      </div>
                  </Link>
              ))}
          </div>
      )}
      
      <div className="mt-40 border-t border-white/10 pt-12 flex flex-col items-center justify-center gap-4">
          <div className="w-1 h-12 bg-white/20" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600">End of Archive</p>
      </div>
    </div>
  );
};