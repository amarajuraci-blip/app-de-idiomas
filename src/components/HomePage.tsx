import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';
import SectionTitle from './SectionTitle';
import ModuleCarousel from './ModuleCarousel';
import { allLanguageData } from '../data/modules';
import { getProgress, markIntroAsPlayed, markAudio03AsPlayed, markAudio06AsPlayed, markAudio09AsPlayed, markAudio13AsPlayed } from '../utils/progress';
import { playAudioOnce } from '../utils/audioPlayer';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const progress = getProgress(lang || 'en');
  
  const [isModule1AudioLocked, setIsModule1AudioLocked] = useState(false);
  const [isModule2AudioLocked, setIsModule2AudioLocked] = useState(false);
  const [isModule3AudioLocked, setIsModule3AudioLocked] = useState(false);
  const [isModule4AudioLocked, setIsModule4AudioLocked] = useState(false);
  const [isModule5AudioLocked, setIsModule5AudioLocked] = useState(false); // <-- NOVO ESTADO
  
  useEffect(() => {
    if (!lang) return;
    const currentProgress = getProgress(lang);

    if (!currentProgress.hasPlayedIntro) {
      setIsModule1AudioLocked(true);
      playAudioOnce('main_intro', '/audio/narrations/ingles/audio_01.mp3');
      setTimeout(() => setIsModule1AudioLocked(false), 14000);
    }

    if (currentProgress.lastLessonCompleted >= 1 && !currentProgress.hasPlayedAudio03) {
      setIsModule2AudioLocked(true);
      playAudioOnce('audio_03', '/audio/narrations/ingles/audio_03.mp3');
      setTimeout(() => setIsModule2AudioLocked(false), 10000);
    }

    if (currentProgress.completedReviews[2] && !currentProgress.hasPlayedAudio06) {
      setIsModule3AudioLocked(true);
      playAudioOnce('audio_06', '/audio/narrations/ingles/audio_06.mp3');
      setTimeout(() => setIsModule3AudioLocked(false), 6000);
    }

    if (currentProgress.completedReviews[3] && !currentProgress.hasPlayedAudio09) {
      setIsModule4AudioLocked(true);
      playAudioOnce('audio_09', '/audio/narrations/ingles/audio_09.mp3');
      setTimeout(() => setIsModule4AudioLocked(false), 7000);
    }

    // Lógica para o audio_13 após concluir o Módulo 4 <-- NOVA LÓGICA
    if (currentProgress.completedReviews[4] && !currentProgress.hasPlayedAudio13) {
      setIsModule5AudioLocked(true); // Bloqueia o Módulo 5
      playAudioOnce('audio_13', '/audio/narrations/ingles/audio_13.mp3');
      // AJUSTE AQUI A DURAÇÃO (em milissegundos) DO audio_13
      setTimeout(() => setIsModule5AudioLocked(false), 10000); // Usando 10 segundos como placeholder
    }

  }, [lang]);

  const handleModuleClick = (moduleId: number) => {
    if (moduleId === 1 && isModule1AudioLocked) return;
    if (moduleId === 2 && isModule2AudioLocked) return;
    if (moduleId === 3 && isModule3AudioLocked) return;
    if (moduleId === 4 && isModule4AudioLocked) return;
    if (moduleId === 5 && isModule5AudioLocked) return; // <-- NOVA VERIFICAÇÃO
    
    if (moduleId > 5) {
        alert(`Módulo ${moduleId} em desenvolvimento!`);
        return;
    }
    
    const isUnlocked = progress.unlockedModules.includes(moduleId);
    if (!isUnlocked) {
      alert(`Complete o módulo ${moduleId - 1} para desbloquear este!`);
      return;
    }

    if (moduleId === 1) markIntroAsPlayed(lang || 'en');
    if (moduleId === 2) markAudio03AsPlayed(lang || 'en');
    if (moduleId === 3) markAudio06AsPlayed(lang || 'en');
    if (moduleId === 4) markAudio09AsPlayed(lang || 'en');
    if (moduleId === 5) markAudio13AsPlayed(lang || 'en'); // <-- NOVA MARCAÇÃO

    const path = `/${lang}/modulo/${moduleId}`;
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('isGuest');
    supabase.auth.signOut(); 
    navigate('/', { replace: true });
  };

  const { main: mainModules, advanced: advancedModules, listeningPractice } = allLanguageData[lang || 'en'].homePageModules;
  const showAdvancedContent = progress.completedReviews[5];

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-300 border border-gray-700 hover:border-gray-600"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
      <section className="relative">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="https://i.imgur.com/nkjNoNO.jpg"
          />
          <img
            src="https://i.imgur.com/ru9WoNh.jpg"
            alt="Banner Principal"
            className="w-full h-[40vh] md:h-[60vh] object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </section>
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <section className="mb-12 md:mb-20">
          <SectionTitle>
            <span className="text-blue-400">♦</span> Módulos Principais <span className="text-blue-400">♦</span>
          </SectionTitle>
          <ModuleCarousel
            modules={mainModules.map(module => {
              const isLockedByProgress = !progress.unlockedModules.includes(module.id);
              const isLockedByAudio = 
                (module.id === 1 && isModule1AudioLocked) || 
                (module.id === 2 && isModule2AudioLocked) || 
                (module.id === 3 && isModule3AudioLocked) ||
                (module.id === 4 && isModule4AudioLocked) ||
                (module.id === 5 && isModule5AudioLocked); // <-- NOVA VERIFICAÇÃO
              return { 
                ...module, 
                isLocked: isLockedByProgress || isLockedByAudio 
              };
            })}
            sectionType="course"
            onModuleClick={handleModuleClick}
          />
        </section>

        {showAdvancedContent && (
          <>
            <section className="mb-12 md:mb-20">
              <SectionTitle>
                <span className="text-green-400">♦</span> Módulos Avançados <span className="text-green-400">♦</span>
              </SectionTitle>
              <ModuleCarousel
                modules={advancedModules}
                sectionType="howto"
                onModuleClick={handleModuleClick}
              />
            </section>
            
            <section className="mb-12 md:mb-20">
              <SectionTitle>
                <span className="text-red-400">♥</span> Treino de escuta <span className="text-red-400">♥</span>
              </SectionTitle>
              <ModuleCarousel
                modules={listeningPractice}
                sectionType="bonus"
                onModuleClick={handleModuleClick}
              />
            </section>
          </>
        )}
      </div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Seu Curso de Idiomas
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A sua jornada para a fluência começa aqui.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;