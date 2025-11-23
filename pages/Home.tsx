import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageReveal, Button, Magnetic } from '../components/Shared';
import { PRODUCTS } from '../constants';

export const Home: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        setMousePos({
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: (e.clientY / window.innerHeight) * 2 - 1
        });
    };
    
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
      setScrollY(scrolled);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-noir-black text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden perspective-1000">
        
        {/* Background Ambient Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-neutral-800 rounded-full blur-[120px] opacity-20 animate-pulse" />
             <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-neutral-900 rounded-full blur-[100px] opacity-30" />
        </div>

        {/* Dynamic Background Typography */}
        <div 
            className="absolute z-0 flex flex-col items-center justify-center inset-0 pointer-events-none transition-transform duration-100 ease-out will-change-transform"
            style={{ 
                transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`
            }}
        >
            <h1 
                className="font-display text-[25vw] leading-[0.8] text-transparent whitespace-nowrap opacity-10 select-none"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}
            >
                SILENCE
            </h1>
        </div>

        {/* Central Monolith Image */}
        <div className="relative z-10 w-[80vw] md:w-[32vw] aspect-[9/13] md:aspect-[3/4] group perspective-1000">
            <div 
                className="w-full h-full relative bg-neutral-900 overflow-hidden shadow-2xl transition-all duration-700 ease-out will-change-transform"
                style={{
                    transform: `rotateY(${mousePos.x * 2}deg) rotateX(${mousePos.y * -2}deg) translateZ(0)`,
                }}
            >
                {/* Image Scale Interaction & Parallax */}
                <div 
                    className="w-full h-full relative transform scale-110 transition-transform duration-[2s]"
                >
                    <img 
                        src="https://picsum.photos/id/1005/1200/1600" 
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000 ease-[0.16,1,0.3,1] will-change-transform"
                        alt="Hero"
                        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
                    />
                     {/* Scanline overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNHYxSDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-20 pointer-events-none mix-blend-overlay" />
                </div>
            </div>

            {/* Decorative Corner Brackets */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
            
            {/* Technical Detail Label */}
            <div className="absolute -right-12 top-1/2 -rotate-90 origin-center text-[9px] font-mono tracking-[0.3em] text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                IMG_REF_004.RAW
            </div>
        </div>

        {/* Foreground Typography */}
        <div className="absolute z-20 inset-0 flex items-center justify-center pointer-events-none mix-blend-difference">
            <h1 className="font-display text-[15vw] md:text-[20vw] leading-none text-white tracking-tighter flex flex-col items-center">
                <span className="block translate-y-[20%] opacity-0 animate-slide-up mix-blend-difference" style={{ animationDelay: '0.2s' }}>THE</span>
                <span className="block -mt-[0.1em] translate-y-[20%] opacity-0 animate-slide-up mix-blend-difference" style={{ animationDelay: '0.4s' }}>VOID</span>
            </h1>
        </div>

        {/* Hero Metadata */}
        <div className="absolute top-24 left-6 md:left-12 z-30 animate-fade-in" style={{ animationDelay: '1s' }}>
             <p className="font-mono text-[9px] uppercase tracking-[0.2em] leading-loose text-neutral-400">
                Vol. 04 — Autumn<br/>
                The Brutalist Archive<br/>
                New York, 2024
             </p>
        </div>

        {/* Hero Footer Elements */}
        <div className="absolute bottom-12 left-6 md:left-12 z-30 animate-fade-in hidden md:block" style={{ animationDelay: '1.2s' }}>
             <div className="flex items-center gap-4">
                 <div className="w-24 h-[1px] bg-white/20 relative overflow-hidden">
                     <div className="absolute top-0 left-0 h-full bg-white transition-all duration-100" style={{ width: `${Math.max(scrollProgress * 2, 10)}%` }} />
                 </div>
                 <span className="font-serif italic text-neutral-400 text-sm">Scroll to Explore</span>
             </div>
        </div>

        <div className="absolute bottom-12 right-6 md:right-12 z-40 animate-fade-in" style={{ animationDelay: '1.4s' }}>
            <Link to="/shop">
                <Magnetic>
                    <Button variant="solid" className="bg-white text-black hover:bg-neutral-300 transition-colors">
                        View Catalog
                    </Button>
                </Magnetic>
            </Link>
        </div>

      </section>

      {/* --- Marquee --- */}
      <div className="border-y border-white/10 bg-noir-black py-6 overflow-hidden">
         <div className="flex animate-marquee whitespace-nowrap gap-12" style={{ animationDuration: '40s' }}>
             {[...Array(10)].map((_, i) => (
                 <span key={i} className="text-[6rem] md:text-[8rem] font-display leading-none text-transparent opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-default" style={{ WebkitTextStroke: '1px #fff'}}>
                     NOIR COLLECTION
                 </span>
             ))}
         </div>
      </div>

      {/* --- Featured Grid --- */}
      <section className="py-32 px-6 md:px-12">
         <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-4">
             <h2 className="font-display text-4xl">Featured Objects</h2>
             <span className="font-mono text-xs">[ 01 — 03 ]</span>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {PRODUCTS.slice(0, 3).map((product, idx) => (
                 <Link to={`/product/${product.id}`} key={product.id} className="group block relative mt-12 md:mt-0" style={{ marginTop: `${idx * 4}rem` }}>
                     <div className="aspect-[3/4] w-full relative mb-6 overflow-hidden">
                         <ImageReveal src={product.images[0]} alt={product.title} className="h-full w-full" />
                         <div className="absolute top-4 left-4 bg-white text-black text-[10px] font-mono px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                             VIEW OBJECT
                         </div>
                     </div>
                     <div className="flex justify-between items-baseline border-b border-white/10 pb-2 group-hover:border-white transition-colors">
                         <h3 className="font-serif text-2xl italic">{product.title}</h3>
                         <span className="font-mono text-xs">${product.price}</span>
                     </div>
                 </Link>
             ))}
         </div>
      </section>

      {/* --- Editorial Statement --- */}
      <section className="py-40 bg-white text-black px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-black/10" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
              <div className="text-right md:text-left order-2 md:order-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4 block">The Philosophy</span>
                  <h2 className="font-display text-5xl md:text-8xl mb-8 leading-[0.9]">
                      FORM <br/> FOLLOWS <br/> FICTION
                  </h2>
                  <p className="font-serif text-xl max-w-md leading-relaxed mb-8">
                      We do not design for the body as it is, but as it could be. 
                      Each piece is a prototype for a future that hasn't happened yet.
                  </p>
                  <Link to="/lookbook">
                      <Button variant="solid" className="bg-black text-white hover:bg-neutral-800">Read Journal</Button>
                  </Link>
              </div>
              <div className="order-1 md:order-2 h-[600px] w-full bg-neutral-100 relative overflow-hidden group">
                   <img src="https://picsum.photos/id/331/800/1200" className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-[1.5s]" alt="Editorial" />
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <div className="w-32 h-32 rounded-full border border-white/50 animate-spin-slow opacity-50" />
                   </div>
              </div>
          </div>
      </section>

      {/* --- Footer CTA --- */}
      <section className="h-[70vh] flex items-center justify-center relative bg-noir-black border-b border-white/10">
          <div className="text-center z-10">
              <span className="font-mono text-xs uppercase text-neutral-500 mb-6 block">The Catalog</span>
              <Link to="/shop" className="group block">
                  <h2 className="font-display text-[15vw] leading-none text-white group-hover:text-transparent group-hover:text-stroke-white transition-all duration-500 ease-in-out" style={{ WebkitTextStroke: '1px #fff' }}>
                      SHOP ALL
                  </h2>
                  <div className="h-[1px] w-0 bg-white group-hover:w-full transition-all duration-500 mx-auto" />
              </Link>
          </div>
          <div className="absolute inset-0 bg-noise opacity-10" />
      </section>
    </div>
  );
};