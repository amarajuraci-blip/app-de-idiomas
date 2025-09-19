import React from 'react';

interface ModuleCardProps {
  moduleNumber: number;
  title: string;
  imageUrl: string;
  sectionType?: 'course' | 'howto' | 'bonus';
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  moduleNumber, 
  title, 
  imageUrl, 
  sectionType = 'course' 
}) => {
  const getAccentColor = () => {
    switch (sectionType) {
      case 'course': return 'border-purple-200 hover:border-purple-400';
      case 'howto': return 'border-blue-200 hover:border-blue-400';
      case 'bonus': return 'border-yellow-400 hover:border-yellow-500';
      default: return 'border-gray-200 hover:border-gray-400';
    }
  };

  const getBorderWidth = () => {
    return sectionType === 'bonus' ? 'border-4' : 'border-2';
  };

  return (
    <div className="group cursor-pointer">
      <div className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${getBorderWidth()} ${getAccentColor()} relative overflow-hidden`}>
        {/* A classe aspect-[2/3] abaixo é a chave para manter a proporção correta */}
        <div className="aspect-[2/3] relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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