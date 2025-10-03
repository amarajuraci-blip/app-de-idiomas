import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2 } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  // O áudio foi removido desta página

  const handleProceed = () => {
    localStorage.setItem('hasSeenAudioWarning', 'true');
    navigate('/selecao-idioma');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative bg-gray-900 border border-purple-500 text-white rounded-lg shadow-xl max-w-md w-full animate-fade-in text-center p-8">
        <Volume2 className="w-16 h-16 text-purple-400 mx-auto mb-6" />

        <h2 className="text-3xl font-bold mb-4">Bem-vindo(a)!</h2>
        
        <p className="text-lg text-gray-300 mb-8">
          Para aproveitar ao máximo a sua jornada de aprendizagem, por favor, ative o som do seu dispositivo e aumente o volume.
        </p>

        <button
          onClick={handleProceed}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full text-lg"
        >
          Entendi, vamos começar!
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;