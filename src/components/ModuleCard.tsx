import React from 'react';

// Interface atualizada: removido moduleNumber e sectionType
interface ModuleCardProps {
  title: string;
  imageUrl: string;
  isLocked?: boolean;
}

// Props atualizadas: removido moduleNumber e sectionType
const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  imageUrl,
  isLocked = false,
}) => {

  // Usando valores padrão para estilo, já que sectionType foi removido
  const accentColor = 'border-purple-200 hover:border-purple-400';
  const borderWidth = 'border-2';

  const imageFilterClass = isLocked ? 'filter grayscale' : '';

  return (
    <div className={`group`}>
      <div className={`rounded-xl shadow-md ${!isLocked ? 'hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1' : ''} ${borderWidth} ${accentColor} relative overflow-hidden`}>
        <div className={`aspect-[2/3] relative ${imageFilterClass}`}>
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover ${!isLocked ? 'group-hover:scale-105 transition-transform duration-300' : ''}`}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 ease-in-out flex items-end">
            <div className="p-2 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform translate-y-4 group-hover:translate-y-0">
              <h3 className="font-bold text-sm md:text-lg text-white">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
