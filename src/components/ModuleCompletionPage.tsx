import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { getProgress, markModule2CompletionAsPlayed, markModule3CompletionAsPlayed, markModule4CompletionAsPlayed, markModule5CompletionAsPlayed } from '../utils/progress';
import { playAudioOnce } from '../utils/audioPlayer';

interface ModuleCompletionPageProps {
  moduleNumber: number;
}

const ModuleCompletionPage: React.FC<ModuleCompletionPageProps> = ({ moduleNumber }) => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (!lang) return;
    const progress = getProgress(lang);

    if (moduleNumber === 2 && !progress.hasPlayedModule2Completion) {
      setIsButtonDisabled(true);
      playAudioOnce('module2_completion', '/audio/narrations/ingles/audio_05.mp3');
      markModule2CompletionAsPlayed(lang);
      setTimeout(() => setIsButtonDisabled(false), 8000);
    }

    if (moduleNumber === 3 && !progress.hasPlayedModule3Completion) {
      setIsButtonDisabled(true);
      playAudioOnce('module3_completion', '/audio/narrations/ingles/audio_08.mp3');
      markModule3CompletionAsPlayed(lang);
      setTimeout(() => setIsButtonDisabled(false), 7000);
    }

    if (moduleNumber === 4 && !progress.hasPlayedModule4Completion) {
      setIsButtonDisabled(true);
      playAudioOnce('module4_completion', '/audio/narrations/ingles/audio_12.mp3');
      markModule4CompletionAsPlayed(lang);
      setTimeout(() => setIsButtonDisabled(false), 5000);
    }
    
    // Lógica para o áudio de conclusão do Módulo 5 <-- NOVA LÓGICA
    if (moduleNumber === 5 && !progress.hasPlayedModule5Completion) {
      setIsButtonDisabled(true); // Desativa o botão
      playAudioOnce('module5_completion', '/audio/narrations/ingles/audio_15.mp3');
      markModule5CompletionAsPlayed(lang); // Marca como tocado

      // Reativa o botão após 14 segundos
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 14000);
    }

  }, [lang, moduleNumber]);

  const messages: { [key: number]: string } = {
    2: 'Você concluiu sua primeira revisão! O Módulo 3 já está liberado. Continue praticando para fixar o conteúdo.',
    3: 'Excelente! Você completou a revisão de escuta. O Módulo 4 já foi desbloqueado para você.',
    4: 'Parabéns! Você finalizou o Módulo 4. O Módulo 5 já está disponível.',
    5: 'Você concluiu todos os desafios! Agora os módulos avançados e de treino estão liberados. Parabéns pela sua dedicação!', // <-- NOVA MENSAGEM
  };

  const message = messages[moduleNumber] || `Módulo ${moduleNumber} concluído com sucesso!`;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="animate-fade-in-down">
        <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Desafio Concluído!</h1>
        <p className="text-lg text-gray-400 max-w-md mx-auto mb-8">
          {message}
        </p>
        <button
          onClick={() => navigate(`/${lang}/home`)}
          disabled={isButtonDisabled}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center mx-auto group transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Ir para o Início
          <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ModuleCompletionPage;