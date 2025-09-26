import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useReviewCards } from '../hooks/useReviewCards';
import { completeFirstReview, getProgress, markModule3IntroAsPlayed } from '../utils/progress';
import { playAudioOnce } from '../utils/audioPlayer';
import { playFeedbackAudio } from '../utils/feedbackPlayer'; // <-- NOVA IMPORTAÇÃO

interface Card {
  id: number;
  translation: string;
  imageUrl: string;
  audioUrl: string;
}

interface Question {
  audioUrl: string;
  options: { id: number; imageUrl: string }[];
  correctAnswer: Card;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Module3Page: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  
  const reviewCards = useReviewCards();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [flashClass, setFlashClass] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isIntroAudioPlaying, setIsIntroAudioPlaying] = useState(false);

  useEffect(() => {
    if (!lang) return;
    const progress = getProgress(lang);
    if (!progress.hasPlayedModule3Intro) {
        setIsIntroAudioPlaying(true);
        playAudioOnce('module3_intro', '/audio/narrations/ingles/audio_07.mp3');
        markModule3IntroAsPlayed(lang);
        setTimeout(() => setIsIntroAudioPlaying(false), 8000);
    }
  }, [lang]);

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play().catch(e => console.error("Erro ao tocar áudio:", e));
  };

  useEffect(() => {
    if (reviewCards.length > 0) {
      generateQuestion(reviewCards, 0);
    }
  }, [reviewCards]);
  
  useEffect(() => {
    if (currentQuestion && currentQuestionIndex > 0 && !showResult) {
      playAudio(currentQuestion.audioUrl);
    }
  }, [currentQuestion, currentQuestionIndex, showResult]);


  const generateQuestion = (cards: Card[], index: number) => {
    if (cards.length === 0) return;
    if (index >= cards.length) {
      navigate(`/${lang}/modulo/3/concluido`);
      return;
    }
    const correctCard = cards[index];
    const wrongAnswers = shuffleArray(cards.filter(card => card.id !== correctCard.id)).slice(0, 3);
    const options = shuffleArray([correctCard, ...wrongAnswers]);
    
    setCurrentQuestion({
      audioUrl: correctCard.audioUrl,
      options: options.map(card => ({ id: card.id, imageUrl: card.imageUrl })),
      correctAnswer: correctCard,
    });
  };

  const handleAnswerClick = (selectedId: number) => {
    if (isProcessing || isIntroAudioPlaying || !currentQuestion) return;

    setIsProcessing(true);
    const isCorrect = selectedId === currentQuestion.correctAnswer.id;
    
    // --- TOCA O ÁUDIO DE FEEDBACK ---
    playFeedbackAudio(isCorrect);

    if (isCorrect && lang) {
      completeFirstReview(lang, 3);
    }
    
    setFlashClass(isCorrect ? 'flash-image-green' : 'flash-image-red');
    setShowResult(true);

    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      generateQuestion(reviewCards, nextIndex);
      setShowResult(false);
      setFlashClass('');
      setIsProcessing(false);
    }, 3000);
  };
  
  if (reviewCards.length === 0) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Nenhum card para revisar!</h2>
        <p className="text-center text-gray-400 mb-6">Complete o Módulo 2 para liberar as revisões.</p>
        <button 
          onClick={() => navigate(`/${lang}/home`)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Voltar
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Carregando revisão...</div>;
  }

  const totalQuestions = reviewCards.length;
  const formattedCurrent = String(currentQuestionIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalQuestions).padStart(2, '0');

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-center">
            O que você está escutando?
          </h2>
          <div className="flex justify-end mt-1">
            <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
              {formattedCurrent}/{formattedTotal}
            </span>
          </div>
        </div>
        <div className={`bg-white rounded-lg p-2 flex justify-center items-center h-64 mb-4 transition-all duration-300 ${flashClass}`}>
          {showResult ? (
            <img src={currentQuestion.correctAnswer.imageUrl} alt={currentQuestion.correctAnswer.translation} className="max-w-full max-h-full object-contain" />
          ) : (
            <button onClick={() => playAudio(currentQuestion.audioUrl)} className="text-black transform hover:scale-110 transition-transform">
              <Volume2 size={80} strokeWidth={1.5} />
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option) => (
            <button 
              key={option.id}
              onClick={() => handleAnswerClick(option.id)}
              disabled={isProcessing || isIntroAudioPlaying}
              className="bg-white rounded-lg p-2 aspect-square flex items-center justify-center hover:scale-105 transition-transform disabled:cursor-not-allowed disabled:opacity-70"
            >
              <img src={option.imageUrl} alt="Opção de resposta" className="max-w-full max-h-full object-contain" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module3Page;