import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import ModuleCard from './ModuleCard';
import { languageModules } from '../data/modules';

const LanguageSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleModuleClick = (languageCode: string) => {
    // Navega para a home daquele idioma
    navigate(`/${languageCode}/home`);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center">
      <div className="container mx-auto px-4 py-16 max-w-7xl text-center">
        <SectionTitle align="center">
          Escolha seu Idioma para Começar
        </SectionTitle>
        
        <p className="text-gray-400 -mt-8 mb-12">Selecione o idioma que você deseja estudar.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          {languageModules.map((module) => (
            <div key={module.id} onClick={() => handleModuleClick(module.code)}>
              <ModuleCard
                moduleNumber={module.id}
                title={module.title}
                imageUrl={module.imageUrl}
                sectionType="course"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionPage;