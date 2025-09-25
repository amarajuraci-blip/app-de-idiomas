import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
// Importações atualizadas para incluir todas as funções necessárias
import { getProgress, markModule2CompletionAsPlayed, markModule3CompletionAsPlayed } from '../utils/progress';
import { playAudioOnce } from '../utils/audioPlayer';

interface ModuleCompletionPageProps {
  moduleNumber: number;
}

const ModuleCompletionPage: React.FC<ModuleCompletionPageProps> = ({ moduleNumber }) => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  // Estado para controlar se o botão está desativado
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (!lang) return;
    const progress = getProgress(lang);

    // Lógica para o áudio de conclusão do Módulo 2
    if (moduleNumber === 2 && !progress.hasPlayedModule2Completion) {
      setIsButtonDisabled(true); // Desativa o botão
      playAudioOnce('module2_completion', '/audio/narrations/ingles/audio_05.mp3');
      markModule2CompletionAsPlayed(lang); // Marca como tocado para não repetir

      // Reativa o botão após 8 segundos
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 8000);
    }

    // Lógica para o áudio de conclusão do Módulo 3
    if (moduleNumber === 3 && !progress.hasPlayedModule3Completion) {
      setIsButtonDisabled(true); // Desativa o botão
      playAudioOnce('module3_completion', '/audio/narrations/ingles/audio_08.mp3');
      markModule3CompletionAsPlayed(lang); // Marca como tocado

      // Reativa o botão após 7 segundos
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 7000);
    }

  }, [lang, moduleNumber]);


  const messages: { [key: number]: string } = {
    2: 'Você concluiu sua primeira revisão! O Módulo 3 já está liberado. Continue praticando para fixar o conteúdo.',
    3: 'Excelente! Você completou a revisão de escuta. O Módulo 4 já foi desbloqueado para você.',
    // Podemos adicionar mensagens para outros módulos aqui no futuro
  };

  const message = messages[moduleNumber] || `Módulo ${moduleNumber} concluído com sucesso!`;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="animate-fade-in-down">
        <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Revisão Concluída!</h1>
        <p className="text-lg text-gray-400 max-w-md mx-auto mb-8">
          {message}
        </p>
        <button
          onClick={() => navigate(`/${lang}/home`)}
          disabled={isButtonDisabled} // O botão é controlado por este estado
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