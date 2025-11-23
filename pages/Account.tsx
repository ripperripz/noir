import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { TextReveal } from '../components/Shared';
import { Link } from 'react-router-dom';

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'wishlist'>('dashboard');

  return (
    <div className="pt-32 min-h-screen container mx-auto px-6 md:px-12 bg-noir-black text-white">
      
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-neutral-800 overflow-hidden relative group">
                <img src="https://picsum.photos/id/64/400/400" className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-opacity" alt="Profile" />
            </div>
            <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2 block">User Profile</span>
                <TextReveal>
                    <h1 className="font-display text-4xl md:text-6xl leading-none">ISABELLA VOID</h1>
                </TextReveal>
            </div>
          </div>
          <div className="mt-8 md:mt-0 font-mono text-[10px] uppercase tracking-widest text-neutral-500 text-right">
              <p>ID: #8829-XJ</p>
              <p>Member Since: 2023</p>
          </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-12 mb-16 overflow-x-auto pb-4 border-b border-white/5">
          {['dashboard', 'orders', 'wishlist'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-xs uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-white' : 'text-neutral-600 hover:text-white'}`}
              >
                  {tab}
                  {activeTab === tab && <span className="absolute -bottom-5 left-0 w-full h-[1px] bg-white" />}
              </button>
          ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[400px] animate-fade-in pb-20">
          
          {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-neutral-900/30 border border-white/5 p-8 md:p-12 relative overflow-hidden group">
                      <h3 className="font-serif italic text-3xl mb-8 text-neutral-200">Primary Location</h3>
                      <p className="font-mono text-sm text-neutral-400 leading-loose">
                          Isabella Void<br/>
                          124 Mercer Street<br/>
                          New York, NY 10012<br/>
                          United States
                      </p>
                      <div className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                      <button className="mt-8 text-[10px] uppercase underline decoration-neutral-700 hover:decoration-white transition-all">
                          Update Coordinates
                      </button>
                  </div>

                  <div className="bg-white text-black p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                      <div>
                          <h3 className="font-display text-4xl mb-2">NOIR STATUS</h3>
                          <p className="font-serif italic text-neutral-500">Tier: Gold</p>
                      </div>
                      <div className="mt-8">
                          <p className="font-mono text-xs uppercase tracking-wider mb-4">Privileges Unlocked</p>
                          <ul className="text-xs space-y-2 font-mono border-t border-black/10 pt-4">
                              <li className="flex justify-between"><span>Early Access</span> <span>[Active]</span></li>
                              <li className="flex justify-between opacity-50"><span>Private Showings</span> <span>[Pending]</span></li>
                          </ul>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'orders' && (
              <div className="space-y-px bg-white/10 border border-white/10">
                  {[1, 2, 3].map((order) => (
                      <div key={order} className="bg-noir-black p-6 md:p-8 flex flex-col md:flex-row justify-between items-center group hover:bg-neutral-900 transition-colors cursor-pointer">
                          <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
                              <span className="font-mono text-[10px] uppercase text-neutral-500 border border-white/10 px-2 py-1">#{order}928</span>
                              <div>
                                  <h4 className="font-serif text-xl italic text-white group-hover:translate-x-2 transition-transform duration-300">Autumn Trench, Silk Scarf</h4>
                                  <p className="font-mono text-[10px] text-neutral-500 mt-1 uppercase">Shipped via DHL Express</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                              <span className="font-mono text-sm text-neutral-300">$1,240.00</span>
                              <span className="font-mono text-[9px] uppercase bg-white text-black px-3 py-1">Delivered</span>
                          </div>
                      </div>
                  ))}
              </div>
          )}

          {activeTab === 'wishlist' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PRODUCTS.slice(0, 3).map(product => (
                      <div key={product.id} className="group relative">
                          <div className="aspect-[3/4] overflow-hidden mb-6 relative bg-neutral-900">
                              <img src={product.images[0]} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100" />
                              
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                  <button className="bg-white text-black font-mono text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-neutral-200 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                      Add to Archive
                                  </button>
                              </div>
                          </div>
                          <div className="flex justify-between items-baseline border-b border-white/10 pb-2 group-hover:border-white transition-colors">
                              <Link to={`/product/${product.id}`}>
                                <h4 className="font-display text-2xl">{product.title}</h4>
                              </Link>
                              <p className="font-mono text-xs text-neutral-400">${product.price}</p>
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>
    </div>
  );
};