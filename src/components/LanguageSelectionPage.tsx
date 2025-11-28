import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { languageModules } from '../data/modules';
import ModuleCard from './ModuleCard';
import PremiumModal from './PremiumModal'; 
import FirstTimeModal from './FirstTimeModal'; 

const QUIZ_COMPLETED_KEY = 'englishQuizCompleted';

const LanguageSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isFirstTimeModalOpen, setIsFirstTimeModalOpen] = useState(false);

  React.useEffect(() => {
    const hasSeenWarning = localStorage.getItem('hasSeenSoundWarning');
    if (!hasSeenWarning) {
      setIsFirstTimeModalOpen(true);
    } else {
      const audio = new Audio('/audio/narrations/efeito/idioma.mp3');
      audio.play().catch(e => console.error(e));
    }
  }, []);

  const handleCloseFirstTimeModal = () => {
    localStorage.setItem('hasSeenSoundWarning', 'true');
    setIsFirstTimeModalOpen(false);
    const audio = new Audio('/audio/narrations/efeito/idioma.mp3');
    audio.play().catch(e => console.error(e));
  };

  const handleModuleClick = (languageCode: string) => {
    if (languageCode === 'en') {
      const hasCompletedQuiz = localStorage.getItem(QUIZ_COMPLETED_KEY) === 'true';
      if (hasCompletedQuiz) {
        navigate(`/${languageCode}/home`);
      } else {
        navigate(`/${languageCode}/quiz`);
      }
    } else {
      // Abre o Modal Premium
      setIsPremiumModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center">
      <FirstTimeModal isOpen={isFirstTimeModalOpen} onClose={handleCloseFirstTimeModal} />
      
      <PremiumModal 
        isOpen={isPremiumModalOpen} 
        onClose={() => setIsPremiumModalOpen(false)}
        pixKey="81995148260"
        price="R$ 29,90" // Preço para o pacote completo na seleção de idiomas
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl text-center">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Escolha seu Idioma para Começar
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-12"></div>
        
        <p className="text-gray-400 -mt-8 mb-12">Selecione o idioma que você deseja estudar.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {languageModules.map((module) => (
            <div key={module.id} onClick={() => handleModuleClick(module.code)}>
              <ModuleCard
                title={module.title}
                imageUrl={module.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionPage;
