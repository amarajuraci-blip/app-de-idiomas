import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const getLanguageFolderName = (langCode: string): string => {
  const map: { [key: string]: string } = {
    en: 'ingles',
    jp: 'japones',
    kr: 'coreano',
    fr: 'frances',
  };
  return map[langCode] || 'ingles';
};

const LessonCompletionPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  
  // Este estado controla se o áudio está tocando
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

  useEffect(() => {
    if (lang) {
      const folderName = getLanguageFolderName(lang);
      const audio = new Audio(`/audio/narrations/${folderName}/aula_concluida.mp3`);
      
      // Quando o áudio terminar, a variável isAudioPlaying vira 'false'
      audio.onended = () => {
        setIsAudioPlaying(false);
      };

      // Tenta tocar o áudio
      audio.play().catch(error => {
        console.error("Erro ao tocar o áudio de conclusão:", error);
        // Se der erro, libera o botão mesmo assim
        setIsAudioPlaying(false); 
      });

    } else {
        // Se não encontrar o idioma, libera o botão
        setIsAudioPlaying(false);
    }
  }, [lang]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="animate-fade-in-down">
        <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Parabéns!</h1>
        <p className="text-lg text-gray-400 max-w-md mx-auto mb-8">
          Todo o conteúdo que estudamos já está disponível nos outros módulos. Você já pode ir para o Módulo 2 e começar suas revisões diárias. Estarei te esperando lá!
        </p>
        <button
          onClick={() => navigate(`/${lang}/home`)}
          // A propriedade 'disabled' usa o estado para se desativar/ativar
          disabled={isAudioPlaying}
          // As classes 'disabled:*' mudam a aparência do botão quando ele está desativado
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center mx-auto group transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Ir para o Início
          <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default LessonCompletionPage;