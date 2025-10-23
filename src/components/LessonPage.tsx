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
        setTimeout(playWithDelay, 1500); // Pausa de 1.5s entre repetições
      }
    };
    playWithDelay();
  };

  // Efeito para controlar a lógica de cada card
  useEffect(() => {
    if (!lessonStarted || !currentCard) return;
    setShowNextButton(false); // Esconde o botão ao mudar de card

    // Toca o áudio do card (exceto para o primeiro card da primeira aula)
    if (!(lesson?.id === 1 && cardIndex === 0)) {
        playAudioWithPauses(currentCard.audioUrl, 3);
    }

    // --- ALTERAÇÃO AQUI ---
    // Define o tempo de espera para mostrar o botão "Próximo"
    const delayToShowButton = (lesson?.id === 1 && cardIndex === 0) ? 14000 : 7000; // 14s para o 1º card da aula 1, 7s para os outros

    const timer = setTimeout(() => {
      setShowNextButton(true);
    }, delayToShowButton); // Usa a variável delayToShowButton

    // Limpa o timer se o componente desmontar ou o card mudar
    return () => clearTimeout(timer);
  }, [cardIndex, currentCard, lessonStarted, lesson]); // Dependências do useEffect

  // Função para iniciar a lição
  const handleStartLesson = () => {
    // Toca a narração introdutória apenas na primeira aula, antes do primeiro card
    if (lesson?.id === 1 && cardIndex === 0 && lang) {
      const folderName = getLanguageFolderName(lang);
      const narrationAudio = new Audio(`/audio/narrations/${folderName}/aula1_intro.mp3`);
      narrationAudio.play().catch(e => console.error("Erro ao tocar narração:", e));
      // Não toca o áudio do card "Sino" aqui, pois o useEffect já o pula
    } else if (currentCard) {
      // Para outras aulas ou cards, toca o áudio do card ao iniciar
      playAudioWithPauses(currentCard.audioUrl, 3);
    }
    setLessonStarted(true);
  };

  // Função para avançar para o próximo card ou concluir a lição
  const handleNext = () => {
    if (isLastCard) {
      if (lang && lesson) {
        // Salva o progresso no localStorage
        saveLessonProgress(lang, lesson.id);
        // Navega para a página de conclusão
        navigate(`/${lang}/aula-concluida`);
      }
    } else {
      // Avança para o próximo card
      setCardIndex(cardIndex + 1);
    }
  };

  // Se não houver cards para a lição
  if (!cards || cards.length === 0) {
    return <div className="min-h-screen bg-black text-white p-8">Nenhum card encontrado para esta aula.</div>;
  }

  // Formatação dos números do contador de cards (ex: 01/12)
  const formattedCurrentCard = String(cardIndex + 1).padStart(2, '0');
  const formattedTotalCards = String(cards.length).padStart(2, '0');

  // Tela de "Começar Aula"
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

  // Tela principal da lição (durante a aula)
  return (
    <div className="h-screen bg-black text-black flex flex-col items-center justify-center p-4 gap-3 overflow-hidden">
      <h2 className="text-2xl font-bold text-white text-center">
        Memorize o nome dessa imagem!
      </h2>

      <div className="w-full max-w-sm flex flex-col gap-3">
        {/* Contador de Cards */}
        <div className="flex justify-end">
          <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
            {formattedCurrentCard}/{formattedTotalCards}
          </span>
        </div>

        {/* Card de Tradução */}
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

        {/* Card de Imagem */}
        <div className="bg-white rounded-lg p-2 flex justify-center items-center h-64">
          <img src={currentCard.imageUrl} alt={currentCard.translation} className="max-w-full max-h-full object-contain" />
        </div>

        {/* Botões de Ação (Tocar áudio e Próximo/Concluir) */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => playAudioWithPauses(currentCard.audioUrl, 1)} // Toca o áudio uma vez ao clicar
            className="bg-white rounded-lg py-3 flex justify-center items-center active:bg-gray-200"
          >
            <Volume2 className="w-7 h-7" />
          </button>

          <div className="col-span-2 h-full">
            {/* Botão Próximo/Concluir (aparece após o delay) */}
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

      {/* Botões Sim/Não (desabilitados nesta tela) */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-4">
        <button className="bg-gray-700 opacity-50 cursor-not-allowed rounded-2xl h-20 flex justify-center items-center text-2xl font-bold" disabled>Não!</button>
        <button className="bg-gray-700 opacity-50 cursor-not-allowed rounded-2xl h-20 flex justify-center items-center text-2xl font-bold" disabled>Sim!</button>
      </div>
    </div>
  );
};

export default LessonPage;
