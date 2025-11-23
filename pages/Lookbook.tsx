import React, { useRef, useEffect } from 'react';
import { TextReveal } from '../components/Shared';

export const Lookbook: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (evt: WheelEvent) => {
      if (window.innerWidth >= 768) { // Only horizontal scroll on desktop
          evt.preventDefault();
          container.scrollLeft += evt.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const looks = [
      { id: 1, img: "https://picsum.photos/id/1027/1000/1500", title: "Look 01", desc: "The coat" },
      { id: 2, img: "https://picsum.photos/id/669/1000/1500", title: "Look 02", desc: "Shadow" },
      { id: 3, img: "https://picsum.photos/id/64/1000/1500", title: "Look 03", desc: "Silk" },
      { id: 4, img: "https://picsum.photos/id/1005/1000/1500", title: "Look 04", desc: "Form" },
      { id: 5, img: "https://picsum.photos/id/338/1000/1500", title: "Look 05", desc: "Void" },
  ];

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden flex flex-col">
        <div className="absolute top-8 left-8 z-10">
            <h1 className="font-display text-4xl">AUTUMN 24</h1>
        </div>

        <div 
            ref={scrollContainerRef}
            className="flex-1 flex md:flex-row flex-col overflow-x-auto overflow-y-hidden hide-scrollbar md:items-center items-start md:pl-[20vw] pt-24 md:pt-0"
        >
            <div className="md:min-w-[400px] px-12 shrink-0 mb-12 md:mb-0">
                 <TextReveal>
                    <p className="font-serif text-2xl md:text-4xl leading-tight max-w-sm">
                        A visual exploration of texture, grain, and contrast. 
                        Photographed by J. Doe in Berlin.
                    </p>
                 </TextReveal>
            </div>

            {looks.map((look) => (
                <div key={look.id} className="md:min-w-[50vh] min-w-full px-4 md:px-8 h-[70vh] relative group shrink-0 flex flex-col justify-end pb-8">
                    <div className="absolute inset-0 overflow-hidden">
                        <img src={look.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale" alt={look.title} />
                    </div>
                    <div className="relative z-10 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <h2 className="font-display text-6xl md:text-8xl mix-blend-difference">{look.title}</h2>
                        <p className="font-serif italic text-xl mix-blend-difference">{look.desc}</p>
                    </div>
                </div>
            ))}
            
            <div className="md:min-w-[500px] min-w-full flex items-center justify-center shrink-0">
                <p className="font-serif italic text-gray-500">End of Lookbook</p>
            </div>
        </div>
    </div>
  );
};
