import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import ModuleCard from './ModuleCard';
import { languageModules } from '../data/modules';
import WarningModal from './WarningModal';
import FirstTimeModal from './FirstTimeModal';

const QUIZ_COMPLETED_KEY = 'englishQuizCompleted'; // Chave do localStorage

const LanguageSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isFirstTimeModalOpen, setIsFirstTimeModalOpen] = useState(false);

  useEffect(() => {
    const hasSeenWarning = localStorage.getItem('hasSeenSoundWarning');
    if (!hasSeenWarning) {
      setIsFirstTimeModalOpen(true);
    } else {
      const audio = new Audio('/audio/narrations/efeito/idioma.mp3');
      audio.play().catch(error => console.error("Erro ao tocar áudio de idioma:", error));
    }
  }, []);

  const handleCloseFirstTimeModal = () => {
    localStorage.setItem('hasSeenSoundWarning', 'true');
    setIsFirstTimeModalOpen(false);
    const audio = new Audio('/audio/narrations/efeito/idioma.mp3');
    audio.play().catch(error => console.error("Erro ao tocar áudio de idioma:", error));
  };

  const handleModuleClick = (languageCode: string) => {
    if (languageCode === 'en') {
      // --- LÓGICA DE REDIRECIONAMENTO PARA O QUIZ ---
      const hasCompletedQuiz = localStorage.getItem(QUIZ_COMPLETED_KEY) === 'true';
      if (hasCompletedQuiz) {
        navigate(`/${languageCode}/home`); // Se já fez o quiz, vai para home
      } else {
        navigate(`/${languageCode}/quiz`); // Se não fez, vai para o quiz
      }
      // ---------------------------------------------
    } else {
      setIsWarningOpen(true); // Para outros idiomas, mostra o aviso
    }
  };

  return (
    <>
      <FirstTimeModal isOpen={isFirstTimeModalOpen} onClose={handleCloseFirstTimeModal} />
      <WarningModal isOpen={isWarningOpen} onClose={() => setIsWarningOpen(false)} />

      <div className="min-h-screen bg-black flex flex-col justify-center">
        <div className="container mx-auto px-4 py-16 max-w-6xl text-center">
          <SectionTitle align="center">
            Escolha seu Idioma para Começar
          </SectionTitle>

          <p className="text-gray-400 -mt-8 mb-12">Selecione o idioma que você deseja estudar.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {languageModules.map((module) => (
              <div key={module.id} onClick={() => handleModuleClick(module.code)}>
                {/* ModuleCard não precisa mais de sectionType */}
                <ModuleCard
                  title={module.title}
                  imageUrl={module.imageUrl}
                  // Removido isLocked se não for necessário aqui
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageSelectionPage;
