import React, { useRef } from 'react';
import ModuleCard from './ModuleCard';

// A interface foi atualizada para incluir a nova propriedade opcional 'isLocked'
interface Module {
  id: number;
  title: string;
  imageUrl: string;
  isLocked?: boolean; 
}

interface ModuleCarouselProps {
  modules: Module[];
  sectionType: 'course' | 'howto' | 'bonus';
  onModuleClick?: (moduleId: number) => void;
}

const ModuleCarousel: React.FC<ModuleCarouselProps> = ({ modules, sectionType, onModuleClick }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth <= 768 ? -180 : -320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth <= 768 ? 180 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleModuleClick = (moduleId: number) => {
    if (onModuleClick) {
      onModuleClick(moduleId);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute left-1 md:left-4 top-1/2 transform -translate-y-1/2 z-10 opacity-0 hover:opacity-100 peer-hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-110"
      >
        <img src="https://i.postimg.cc/4xZc2nv2/Esquerda.png" alt="Seta Esquerda" className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 drop-shadow-lg" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 z-10 opacity-0 hover:opacity-100 peer-hover:opacity-100 transition-all duration-300 ease-in-out hover:scale-110"
      >
        <img src="https://i.postimg.cc/0yfwTxck/Direita.png" alt="Seta Direita" className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 drop-shadow-lg" />
      </button>

      <div ref={scrollContainerRef} className="flex overflow-x-scroll pb-6 scrollbar-hide gap-3 md:gap-6 px-2 md:px-8 lg:px-10 peer">
        <div className="flex gap-3 md:gap-6 min-w-max">
          {modules.map((module) => (
            <div 
              key={module.id} 
              className="w-40 sm:w-48 md:w-80 flex-shrink-0 group"
              onClick={() => handleModuleClick(module.id)}
            >
              <ModuleCard
                moduleNumber={module.id}
                title={module.title}
                imageUrl={module.imageUrl}
                sectionType={sectionType}
                isLocked={module.isLocked} // <-- Passa a informação de bloqueio para o ModuleCard
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-0 bottom-6 w-2 md:w-16 lg:w-20 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-6 w-2 md:w-16 lg:w-20 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ModuleCarousel;