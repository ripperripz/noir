import React, { useEffect, useRef, useState, ReactNode } from 'react';

// --- Preloader ---
export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 500);
          setTimeout(onComplete, 1500); // Wait for exit animation
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[10000] bg-noir-black flex flex-col justify-between p-8 md:p-12 transition-transform duration-1000 ease-[0.83,0,0.17,1] ${isExiting ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="flex justify-between items-start font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            <span>System Boot</span>
            <span>Vol. 04</span>
        </div>
        
        <div className="relative">
            <h1 className="font-display text-6xl md:text-9xl text-white mix-blend-difference leading-none tracking-tighter">
                NOIR.
            </h1>
            <div className="h-[1px] w-full bg-white/20 mt-8 relative overflow-hidden">
                <div 
                    className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out" 
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex justify-between mt-2 font-mono text-[10px] text-white">
                <span>LOADING ASSETS</span>
                <span>{Math.min(progress, 100)}%</span>
            </div>
        </div>

        <div className="flex justify-between items-end font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            <span>New York, NY</span>
            <span>Est. 2024</span>
        </div>
    </div>
  );
};

// --- Custom Cursor ---
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (followerRef.current) {
        setTimeout(() => {
            if (followerRef.current) followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }, 80);
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] -mt-1 -ml-1 transition-transform duration-75 ease-out will-change-transform" 
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full mix-blend-difference pointer-events-none z-[9998] -mt-4 -ml-4 transition-transform duration-300 ease-out will-change-transform opacity-50" 
      />
    </>
  );
};

// --- Cursor Image Preview (For List View) ---
export const CursorImagePreview: React.FC<{ src: string | null }> = ({ src }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current && src) {
        // Offset slightly from cursor so it doesn't block view
        const x = e.clientX + 20;
        const y = e.clientY + 20;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [src]);

  return (
    <div 
      ref={ref}
      className={`fixed top-0 left-0 z-[60] pointer-events-none transition-opacity duration-300 ease-out ${src ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'transform' }}
    >
      <div className="w-[200px] h-[300px] overflow-hidden bg-noir-gray shadow-2xl relative">
          {src && <img src={src} className="w-full h-full object-cover" alt="Preview" />}
      </div>
    </div>
  );
};

// --- Magnetic Button Wrapper ---
export const Magnetic: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseOver = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left:0, top:0, width:0, height:0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  }

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className="transition-transform duration-200 ease-out cursor-pointer inline-block"
    >
      {children}
    </div>
  );
};

// --- Grain ---
export const GrainOverlay: React.FC = () => (
  <div className="bg-noise fixed inset-0 pointer-events-none" />
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'minimal';
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'solid', ...props }) => {
  const baseStyle = "uppercase tracking-[0.2em] text-[10px] py-4 px-8 transition-all duration-300 relative overflow-hidden group border border-transparent";
  
  const variants = {
    solid: "bg-white text-black hover:bg-neutral-300",
    outline: "border-white/20 text-white hover:border-white hover:bg-white hover:text-black",
    minimal: "text-white/60 hover:text-white px-0 py-2 border-b border-transparent hover:border-white/50"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// --- Text Reveal (Staggered Characters) ---
export const TextReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div 
        className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${inView ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

// --- Image Reveal ---
export const ImageReveal: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
       <img 
         src={src} 
         alt={alt} 
         className={`w-full h-full object-cover transition-all duration-[1.5s] ease-out scale-110 ${inView ? 'scale-100 opacity-100 grayscale-0' : 'scale-110 opacity-50 grayscale'}`} 
       />
       <div className={`absolute inset-0 bg-noir-black transition-all duration-[1.2s] ease-[0.83, 0, 0.17, 1] origin-top ${inView ? 'scale-y-0' : 'scale-y-100'}`} />
    </div>
  );
};

// --- Line Separator ---
export const Line: React.FC = () => (
  <div className="w-full h-[1px] bg-white/10 my-8" />
);