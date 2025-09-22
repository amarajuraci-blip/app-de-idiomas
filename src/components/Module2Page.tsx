// src/components/Module2Page.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSupabaseReview } from '../hooks/useSupabaseReview';
import { allLanguageData } from '../data/modules'; // Precisamos disto para gerar as opções

// Uma função auxiliar para criar as opções de resposta
const generateOptions = (allCards: any[], correctCard: any) => {
  const shuffled = [...allCards].sort(() => 0.5 - Math.random());
  
  // Usamos 'card_id' para o 'correctCard' e 'id' para os 'allCards'
  const wrongAnswers = shuffled.filter(card => card.id !== correctCard.card_id).slice(0, 4);
  
  // O 'correctCard' já tem os dados que precisamos, como 'translation'
  const options = [correctCard, ...wrongAnswers].sort(() => 0.5 - Math.random());
  
  return options.map((opt, i) => ({
    letter: String.fromCharCode(65 + i),
    text: opt.translation,
  }));
};


const Module2Page: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  // --- LÓGICA PRINCIPAL ---
  const { reviewCards, isLoading, error, updateCardProgress } = useSupabaseReview();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState<{ letter: string; text: string }[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [imageFlashClass, setImageFlashClass] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (reviewCards.length > 0 && currentQuestionIndex < reviewCards.length) {
      const correctCard = reviewCards[currentQuestionIndex];
      const allCards = allLanguageData[lang!]?.lessons.flatMap(l => l.cards) || [];
      const generatedOptions = generateOptions(allCards, correctCard);
      setOptions(generatedOptions);
    }
  }, [reviewCards, currentQuestionIndex, lang]);
  
  const handleAnswerClick = async (selectedText: string, event: React.MouseEvent<HTMLButtonElement>) => {
    if (isProcessing) return;
    setIsProcessing(true);
    event.currentTarget.blur();

    const currentCard = reviewCards[currentQuestionIndex];
    const isCorrect = selectedText === currentCard.translation;

    setSelectedAnswer({ text: selectedText, isCorrect });
    setImageFlashClass(isCorrect ? 'flash-image-green' : 'flash-image-red');

    await updateCardProgress(currentCard.card_id, currentCard.srs_level, isCorrect);

    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex >= reviewCards.length) {
        alert("Revisão concluída!");
        navigate(`/${lang}/home`);
        return;
      }

      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setImageFlashClass('');
      setIsProcessing(false);
    }, 2000);
  };

  // --- NOVA getOptionClass DENTRO DO COMPONENTE ---
  const getOptionClass = (optionText: string) => {
    if (!selectedAnswer) return 'border-gray-700';
    
    const { text: selectedText, isCorrect } = selectedAnswer;
    const isThisOptionCorrect = optionText === reviewCards[currentQuestionIndex].translation;
    const isThisOptionSelected = optionText === selectedText;

    if (!isCorrect && isThisOptionSelected) return 'wrong-answer-border';
    if (isThisOptionCorrect) return 'correct-answer-border';
    
    return 'border-gray-700 opacity-50';
  };

  if (isLoading) {
    return <div className="h-screen bg-black text-white flex items-center justify-center">A carregar revisão...</div>;
  }

  if (error) {
    return <div className="h-screen bg-black text-white flex items-center justify-center">Ocorreu um erro: {error}</div>;
  }
  
  if (reviewCards.length === 0) {
      return (
        <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold text-center mb-4">Nenhum card para rever!</h2>
            <p className="text-center text-gray-400 mb-6">Complete algumas aulas no Módulo 1 ou volte mais tarde.</p>
            <button 
                onClick={() => navigate(`/${lang}/home`)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
                Voltar
            </button>
        </div>
      )
  }

  const totalQuestions = reviewCards.length;
  const formattedCurrent = String(currentQuestionIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalQuestions).padStart(2, '0');
  const currentCard = reviewCards[currentQuestionIndex];

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
          <img src={currentCard.imageUrl} alt="Imagem da questão" className="max-w-full max-h-full object-contain" />
        </div>
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <button 
              key={option.letter}
              onClick={(e) => handleAnswerClick(option.text, e)}
              disabled={isProcessing}
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