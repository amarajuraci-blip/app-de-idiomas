import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReviewCards } from '../hooks/useReviewCards';
import { completeFirstReview, getProgress, markModule2IntroAsPlayed } from '../utils/progress';
import { playAudioOnce } from '../utils/audioPlayer';

// Função para embaralhar um array (algoritmo Fisher-Yates)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Module2Page: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const reviewCards = useReviewCards();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<any | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [imageFlashClass, setImageFlashClass] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [isIntroAudioPlaying, setIsIntroAudioPlaying] = useState(false);

  useEffect(() => {
    if (!lang) return;
    const progress = getProgress(lang);

    if (!progress.hasPlayedModule2Intro) {
      setIsIntroAudioPlaying(true);
      playAudioOnce('module2_intro', '/audio/narrations/ingles/audio_04.mp3');
      markModule2IntroAsPlayed(lang);

      setTimeout(() => {
        setIsIntroAudioPlaying(false);
      }, 11000);
    }
  }, [lang]);


  useEffect(() => {
    if (reviewCards.length > 0) {
      generateQuestion(reviewCards, currentQuestionIndex);
    }
  }, [reviewCards, currentQuestionIndex]);

  const generateQuestion = (cards: any[], index: number) => {
    // --- LÓGICA DE CONCLUSÃO ATUALIZADA ---
    if (index >= cards.length) {
      // Em vez de um alert, navega para a nova página de conclusão
      navigate(`/${lang}/modulo/2/concluido`);
      return;
    }
    const correctCard = cards[index];
    const wrongAnswers = shuffleArray(cards.filter(card => card.id !== correctCard.id)).slice(0, 4);
    const optionsText = shuffleArray([correctCard, ...wrongAnswers]);

    const questionData = {
      imageUrl: correctCard.imageUrl,
      options: optionsText.map((opt: any, i: number) => ({
        letter: String.fromCharCode(65 + i),
        text: opt.translation,
      })),
      correctAnswer: correctCard.translation,
    };
    setCurrentQuestion(questionData);
  };

  const handleAnswerClick = (selectedText: string, event: React.MouseEvent<HTMLButtonElement>) => {
    if (isProcessing || isIntroAudioPlaying) return;

    const isCorrect = selectedText === currentQuestion?.correctAnswer;

    if (isCorrect && lang) {
      completeFirstReview(lang, 2);
    }

    setIsProcessing(true);
    setSelectedAnswer({ text: selectedText, isCorrect });
    setImageFlashClass(isCorrect ? 'flash-image-green' : 'flash-image-red');
    event.currentTarget.blur();

    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setImageFlashClass('');
      setIsProcessing(false);
    }, 2000);
  };

  const getOptionClass = (optionText: string) => {
    if (!selectedAnswer) return 'border-gray-700';

    const { text: selectedText, isCorrect } = selectedAnswer;
    const isThisOptionCorrect = optionText === currentQuestion.correctAnswer;
    const isThisOptionSelected = optionText === selectedText;

    if (!isCorrect && isThisOptionSelected) return 'wrong-answer-border';
    if (isThisOptionCorrect) return 'correct-answer-border';

    return 'border-gray-700 opacity-50';
  };

  const totalQuestions = reviewCards.length;
  const formattedCurrent = String(currentQuestionIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalQuestions).padStart(2, '0');

  if (reviewCards.length > 0 && !currentQuestion) {
    return <div className="h-screen bg-black text-white flex items-center justify-center">A carregar revisão...</div>;
  }

  if (reviewCards.length === 0) {
      return (
        <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Nenhum card para rever!</h2>
            <p className="text-center text-gray-400 mb-6">Complete algumas aulas no Módulo 1 para liberar as revisões.</p>
            <button
                onClick={() => navigate(`/${lang}/home`)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
                Voltar
            </button>
        </div>
      )
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate(`/${lang}/home`)}
          className="absolute top-4 left-4 flex items-center text-white hover:text-purple-400 transition-colors duration-300 text-lg group z-10"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Voltar
        </button>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center">
            Qual nome dessa imagem?
          </h2>
          <div className="flex justify-end mt-1">
            <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
              {formattedCurrent}/{formattedTotal}
            </span>
          </div>
        </div>
        <div className={`bg-white rounded-lg p-2 flex justify-center items-center h-64 mb-4 ${imageFlashClass}`}>
          <img src={currentQuestion.imageUrl} alt="Imagem da questão" className="max-w-full max-h-full object-contain" />
        </div>
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option: any) => (
            <button
              key={option.letter}
              onClick={(e) => handleAnswerClick(option.text, e)}
              disabled={isProcessing || isIntroAudioPlaying}
              className={`bg-gray-800 border-2 rounded-lg py-1 px-2 flex items-center w-full text-left transition-all duration-200 ${getOptionClass(option.text)} disabled:cursor-not-allowed`}
            >
              <div className="bg-gray-700 w-7 h-7 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white font-bold text-base">{option.letter}</span>
              </div>
              <span className="text-white font-semibold text-base">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module2Page;