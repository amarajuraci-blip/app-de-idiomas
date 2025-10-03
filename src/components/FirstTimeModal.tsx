import React from 'react';
import { Volume2, X } from 'lucide-react';

interface FirstTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FirstTimeModal: React.FC<FirstTimeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="relative bg-gray-900 border border-purple-500 text-white rounded-lg shadow-xl max-w-md w-full animate-fade-in text-center p-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <Volume2 className="w-16 h-16 text-purple-400 mx-auto mb-6" />

        <h2 className="text-3xl font-bold mb-4">Bem-vindo(a)!</h2>
        
        <p className="text-lg text-gray-300 mb-8">
          Para aproveitar ao máximo a sua jornada de aprendizagem, por favor, ative o som do seu dispositivo e aumente o volume.
        </p>

        <button
          onClick={onClose}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full text-lg"
        >
          Entendi, vamos começar!
        </button>
      </div>
    </div>
  );
};

export default FirstTimeModal;