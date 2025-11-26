import React from 'react';
import { X } from 'lucide-react';

interface LockedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction?: () => void; // Ação do botão principal
  title?: string;
  message: string;
  buttonText?: string;
}

const LockedModal: React.FC<LockedModalProps> = ({ isOpen, onClose, onAction, title, message, buttonText = "OK" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="relative bg-gray-900 border border-purple-500 rounded-lg shadow-xl max-w-md w-full text-center p-8 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {title && <h2 className="text-2xl font-bold mb-4 text-purple-400">{title}</h2>}
        
        <p className="text-lg text-gray-300 mb-8">
          {message}
        </p>

        <button
          onClick={onAction || onClose}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full text-lg"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default LockedModal;
