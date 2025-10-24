import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Chave para guardar o estado do quiz no localStorage
const QUIZ_COMPLETED_KEY = 'englishQuizCompleted';

// Interface para as opções de resposta (para perguntas 2, 3, 4)
interface Option {
  value: string; // Valor interno (ex: 'A', 'B')
  text: string;  // Texto exibido na opção
}

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 a 4 para perguntas, 5 para resultado
  const [isClickable, setIsClickable] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState<'A' | 'B' | null>(null); // Para guardar a resposta da última pergunta
  const audioRef = useRef<HTMLAudioElement | null>(null); // Referência para controlar o áudio

  // Função para tocar áudio e limpar a referência anterior
  const playAudio = (audioPath: string) => {
    if (audioRef.current) {
      audioRef.current.pause(); // Para o áudio anterior se estiver tocando
    }
    try {
      const audio = new Audio(audioPath);
      audio.play().catch(e => console.error(`Erro ao tocar ${audioPath}:`, e));
      audioRef.current = audio; // Guarda a referência do novo áudio
    } catch (error) {
      console.error(`Erro ao criar áudio ${audioPath}:`, error);
      audioRef.current = null;
    }
  };

  // Efeito para controlar delays e áudios a cada passo
  useEffect(() => {
    setIsClickable(false); // Desabilita cliques ao mudar de passo
    let delay = 0;
    let audioPath = '';

    switch (step) {
      case 1:
        delay = 16000; // 16 segundos
        audioPath = '/audio/quiz/quiz1.mp3';
        break;
      case 2:
        delay = 4000; // 4 segundos
        audioPath = '/audio/quiz/quiz2.mp3';
        break;
      case 3:
        delay = 7000; // 7 segundos
        audioPath = '/audio/quiz/quiz3.mp3';
        break;
      case 4:
        delay = 7000; // 7 segundos
        audioPath = '/audio/quiz/quiz4.mp3';
        break;
      case 5: // Passo do resultado final
        if (finalAnswer === 'A') {
          delay = 12000; // 12 segundos
          audioPath = '/audio/quiz/quiz_resa.mp3';
        } else if (finalAnswer === 'B') {
          delay = 13000; // 13 segundos
          audioPath = '/audio/quiz/quiz_resb.mp3';
        }
        break;
    }

    if (audioPath) {
      playAudio(audioPath);
    }

    if (delay > 0) {
      const timer = setTimeout(() => {
        setIsClickable(true);
      }, delay);
      return () => clearTimeout(timer); // Limpa o timer ao mudar de passo
    } else {
      setIsClickable(true); // Se não houver delay (improvável aqui, mas seguro), habilita direto
    }

    // Limpa o áudio ao desmontar o componente
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };

  }, [step, finalAnswer]); // Re-executa quando o passo ou a resposta final mudam

  // Função para avançar para o próximo passo ou finalizar
  const handleNextStep = (answerValue?: string) => {
    if (step === 4 && answerValue) {
      setFinalAnswer(answerValue as 'A' | 'B'); // Guarda a resposta da última pergunta
      setStep(5); // Vai para a tela de resultado
    } else if (step < 4) {
      setStep(prevStep => prevStep + 1);
    } else if (step === 5) {
      // Marca como concluído e navega para a home
      localStorage.setItem(QUIZ_COMPLETED_KEY, 'true');
      navigate('/en/home', { replace: true });
    }
  };

  // ---- Renderização das Perguntas e Opções ----

  const renderQuestion1 = () => (
    <>
      <p className="text-lg text-gray-300 mb-8">
        Iremos agora personalizar sua jornada no Inglês, irei te fazer 3 perguntas, a primeira é: Qual versão do inglês te atrai mais? Seria o inglês Americano ou quem sabe o Inglês Britânico?
      </p>
      <div className="flex justify-center items-center gap-8">
        {/* Opção Americano */}
        <button
          onClick={() => handleNextStep()}
          disabled={!isClickable}
          className={`text-center transition-all duration-500 ${!isClickable ? 'filter grayscale cursor-not-allowed opacity-50' : 'hover:scale-105'}`}
        >
          <img src="https://flagcdn.com/w160/us.png" alt="Bandeira EUA" className="w-32 h-auto mx-auto mb-2 rounded border-2 border-transparent hover:border-purple-400"/>
          <span className="font-semibold">Americano</span>
        </button>
        {/* Opção Britânico */}
        <button
          onClick={() => handleNextStep()}
          disabled={!isClickable}
          className={`text-center transition-all duration-500 ${!isClickable ? 'filter grayscale cursor-not-allowed opacity-50' : 'hover:scale-105'}`}
        >
          <img src="https://flagcdn.com/w160/gb.png" alt="Bandeira Reino Unido" className="w-32 h-auto mx-auto mb-2 rounded border-2 border-transparent hover:border-purple-400"/>
          <span className="font-semibold">Britânico</span>
        </button>
      </div>
    </>
  );

  const renderQuestionWithOptions = (questionText: string, options: Option[], questionNumber: number) => (
    <>
      <p className="text-lg text-gray-300 mb-8">{questionText}</p>
      <div className="space-y-4 w-full max-w-sm mx-auto">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleNextStep(option.value)} // Passa o valor se for a última pergunta
            disabled={!isClickable}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 ${
              !isClickable
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 hover:bg-purple-800 border border-purple-600 hover:border-purple-400'
            }`}
          >
           <span className="font-semibold">{option.text}</span>
          </button>
        ))}
      </div>
    </>
  );

  const renderResult = () => (
    <>
      <p className="text-lg text-gray-300 mb-8">
        {finalAnswer === 'A'
          ? "Perfeito! Logo faremos uns teste de conversação ante de iniciar o cronograma que eu criei pra você. clique em iniciar para eu te explicar a dinâmica do nosso curso."
          : "Não se preocupe então, com 3 semanas você já conseguirá trocar algumas palavras comigo, clique em iniciar para eu te explicar a dinâmica do nosso curso."
        }
      </p>
      <button
        onClick={() => handleNextStep()}
        disabled={!isClickable}
        className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full max-w-xs mx-auto text-lg ${!isClickable ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Iniciar
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
      <div className="relative bg-gray-900 border border-purple-500 rounded-lg shadow-xl max-w-lg w-full text-center p-8 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">Personalizando sua Jornada</h2>

        {step === 1 && renderQuestion1()}
        {step === 2 && renderQuestionWithOptions(
          "Como você se sente mais a vontade para estudar inglês?",
          [
            { value: 'A', text: "A. Com filmes e série" },
            { value: 'B', text: "B. Musicas internacionais" },
            { value: 'C', text: "C. Conteúdo Gospel" },
            { value: 'D', text: "D. Animação infantil (criança)" },
          ],
          2
        )}
         {step === 3 && renderQuestionWithOptions(
          "Me informe qual seu principal objetivo no inglês, para eu poder focar em te ensinar de uma forma mais rápida:",
          [
            { value: 'A', text: "A. Preciso viajar em pouco tempo." },
            { value: 'B', text: "B. Preciso estudar termos mais corporativo para o trabalho" },
            { value: 'C', text: "C. Sou cantor (a) e quero aprender as pronuncias rapidamente." },
            { value: 'D', text: "D. Aprender a trocar Conversar rapidamente sem gramatica" },
            { value: 'E', text: "E. Quero fazer o cronograma completo do curso." },
          ],
          3
        )}
         {step === 4 && renderQuestionWithOptions(
          "Você ja tem conhecimento para conversar comigo em inglês ou você é completamente iniciante?",
          [
            { value: 'A', text: "A. Ja sei falar um pouco" },
            { value: 'B', text: "B. Sou completamente iniciante" },
          ],
          4
        )}
        {step === 5 && renderResult()}
      </div>
    </div>
  );
};

export default QuizPage;
