import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Volume2, PlayCircle } from 'lucide-react';
import { allLanguageData } from '../data/modules';
import { saveLessonProgress } from '../utils/progress'; // Importamos a função para salvar no localStorage

// Função para obter o nome da pasta de áudio correspondente ao idioma
const getLanguageFolderName = (langCode: string): string => {
  const map: { [key: string]: string } = {
    en: 'ingles',
    jp: 'japones',
    kr: 'coreano',
    fr: 'frances',
  };
  return map[langCode] || 'ingles';
};

const LessonPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang, lessonId } = useParams<{ lang: string; lessonId: string }>();
  
  const languageData = allLanguageData[lang || 'en'];
  const lesson = languageData.lessons.find(l => l.id.toString() === lessonId);

  const [cardIndex, setCardIndex] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [lessonStarted, setLessonStarted] = useState(false);

  const cards = lesson?.cards || [];
  const currentCard = cards[cardIndex];
  const isLastCard = cardIndex === cards.length - 1;

  // Função para tocar o áudio com repetições e pausas
  const playAudioWithPauses = (audioUrl: string, repetitions: number) => {
    if (!audioUrl) return;
    let playCount = 0;
    const audio = new Audio(audioUrl);
    const playWithDelay = () => { audio.play().catch(e => console.error("Erro ao tocar áudio:", e)); };
    audio.onended = () => {
      playCount++;
      if (playCount < repetitions) {
        setTimeout(playWithDelay, 1500);
      }
    };
    playWithDelay();
  };

  // Efeito para controlar a lógica de cada card
  useEffect(() => {
    if (!lessonStarted || !currentCard) return;
    setShowNextButton(false);
    
    if (!(lesson?.id === 1 && cardIndex === 0)) {
        playAudioWithPauses(currentCard.audioUrl, 3);
    }

    const timer = setTimeout(() => {
      setShowNextButton(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, [cardIndex, currentCard, lessonStarted, lesson]);

  // Função para iniciar a lição
  const handleStartLesson = () => {
    if (lesson?.id === 1 && cardIndex === 0 && lang) {
      const folderName = getLanguageFolderName(lang);
      const narrationAudio = new Audio(`/audio/narrations/${folderName}/aula1_intro.mp3`);
      narrationAudio.play().catch(e => console.error("Erro ao tocar narração:", e));
    } else if (currentCard) {
      playAudioWithPauses(currentCard.audioUrl, 3);
    }
    setLessonStarted(true);
  };

  // Função para avançar ou concluir a lição
  const handleNext = () => {
    if (isLastCard) {
      if (lang && lesson) {
        // AQUI ESTÁ A LÓGICA CHAVE:
        // 1. Salva o ID da lição concluída no localStorage do navegador.
        saveLessonProgress(lang, lesson.id);
        
        // 2. Navega para a página de conclusão (sem precisar de back-end).
        navigate(`/${lang}/aula-concluida`);
      }
    } else {
      setCardIndex(cardIndex + 1);
    }
  };
  
  if (!cards || cards.length === 0) {
    return <div className="min-h-screen bg-black text-white p-8">Nenhum card encontrado para esta aula.</div>;
  }

  const formattedCurrentCard = String(cardIndex + 1).padStart(2, '0');
  const formattedTotalCards = String(cards.length).padStart(2, '0');

  // Ecrã de "Começar Aula"
  if (!lessonStarted) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Aula {lessonId}</h1>
        <p className="text-gray-400 text-center mb-8">Clique abaixo para começar</p>
        <button
          onClick={handleStartLesson}
          className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-full h-32 w-32 flex items-center justify-center transform hover:scale-105 transition-transform"
        >
          <PlayCircle size={80} />
        </button>
      </div>
    );
  }

  // Ecrã principal da lição
  return (
    <div className="h-screen bg-black text-black flex flex-col items-center justify-center p-4 gap-3 overflow-hidden">
      <h2 className="text-2xl font-bold text-white text-center">
        Memorize o nome dessa imagem!
      </h2>
      
      <div className="w-full max-w-sm flex flex-col gap-3">
        <div className="flex justify-end">
          <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
            {formattedCurrentCard}/{formattedTotalCards}
          </span>
        </div>

        <div className="bg-white rounded-lg p-2 shadow-lg">
          <div className="flex items-center border-b border-gray-300 p-2 h-12">
            <img src="https://flagcdn.com/w40/br.png" alt="Bandeira do Brasil" className="w-8 h-auto mr-3" />
            <span className="font-bold text-xl">{currentCard.portuguese}</span>
          </div>
          <div className="flex items-center p-2 h-12">
            <img src={`https://flagcdn.com/w40/${lang === 'en' ? 'us' : lang}.png`} alt="Bandeira do Idioma" className="w-8 h-auto mr-3" />
            <span className="font-bold text-xl">{currentCard.translation}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-2 flex justify-center items-center h-64">
          <img src={currentCard.imageUrl} alt={currentCard.translation} className="max-w-full max-h-full object-contain" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => playAudioWithPauses(currentCard.audioUrl, 1)} 
            className="bg-white rounded-lg py-3 flex justify-center items-center active:bg-gray-200"
          >
            <Volume2 className="w-7 h-7" />
          </button>
          
          <div className="col-span-2 h-full">
            {showNextButton && (
              <button 
                onClick={handleNext} 
                className={`w-full h-full rounded-lg font-bold text-base transition-all duration-300 ${isLastCard ? 'bg-green-600 text-white' : 'bg-white text-black'}`}
              >
                {isLastCard ? 'CONCLUIR' : 'PRÓXIMO'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm grid grid-cols-2 gap-4">
        <button className="bg-gray-700 opacity-50 cursor-not-allowed rounded-2xl h-20 flex justify-center items-center text-2xl font-bold" disabled>Não!</button>
        <button className="bg-gray-700 opacity-50 cursor-not-allowed rounded-2xl h-20 flex justify-center items-center text-2xl font-bold" disabled>Sim!</button>
      </div>
    </div>
  );
};

export default LessonPage;