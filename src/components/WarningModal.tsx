import React from 'react';

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-sm w-full animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src="/images/aviso.webp" 
          alt="Aviso de Pagamento" 
          className="w-full h-auto object-contain rounded-lg" 
        />
        
        {/* --- POSIÇÃO DO BOTÃO AJUSTADA --- */}
        {/* Alterei de 'bottom-5' para 'bottom-16' para subir o botão */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-4/5">
          <button
            onClick={onClose}
            className="bg-white hover:bg-gray-200 text-red-700 font-bold py-3 px-8 rounded-full transition-colors w-full text-lg shadow-xl"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;