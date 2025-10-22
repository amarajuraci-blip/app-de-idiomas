import React, { useRef } from 'react';
import ModuleCard from './ModuleCard';

// Interface atualizada para incluir isLocked opcionalmente (já estava ok)
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

  // Funções scrollLeft e scrollRight mantidas iguais
  const scrollLeft = () => { /* ... */ };
  const scrollRight = () => { /* ... */ };


  // --- FUNÇÃO ATUALIZADA ---
  // Agora só chama onModuleClick se o módulo não estiver explicitamente marcado como bloqueado
  const handleCardClick = (module: Module) => {
    if (!module.isLocked && onModuleClick) {
      onModuleClick(module.id);
    }
    // Se estiver bloqueado, não faz nada
  };

  return (
    <div className="relative">
      {/* Botões de scroll mantidos iguais */}
      <button onClick={scrollLeft} className="..."> {/* ... */} </button>
      <button onClick={scrollRight} className="..."> {/* ... */} </button>

      <div ref={scrollContainerRef} className="flex overflow-x-scroll pb-6 scrollbar-hide gap-3 md:gap-6 px-2 md:px-8 lg:px-10 peer">
        <div className="flex gap-3 md:gap-6 min-w-max">
          {modules.map((module) => (
            // --- ONCLICK ATUALIZADO ---
            // Chama handleCardClick que agora verifica o isLocked
            <div
              key={module.id}
              className={`w-40 sm:w-48 md:w-80 flex-shrink-0 group ${module.isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`} // Adiciona cursor-not-allowed se bloqueado
              onClick={() => handleCardClick(module)} // Passa o objeto module inteiro
            >
              <ModuleCard
                moduleNumber={module.id}
                title={module.title}
                imageUrl={module.imageUrl}
                sectionType={sectionType}
                isLocked={module.isLocked} // Passa a informação de bloqueio para o ModuleCard
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlays de gradiente mantidos iguais */}
      <div className="absolute left-0 top-0 bottom-6 w-2 md:w-16 lg:w-20 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-6 w-2 md:w-16 lg:w-20 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ModuleCarousel;
