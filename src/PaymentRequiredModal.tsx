import React from 'react';
import { X } from 'lucide-react';

interface PaymentRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixKey: string;
  pixName: string;
}

const PaymentRequiredModal: React.FC<PaymentRequiredModalProps> = ({ isOpen, onClose, pixKey, pixName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="relative bg-red-800 text-white rounded-lg shadow-xl max-w-sm w-full p-6 text-center animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-200 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <div className="mb-6">
          <img 
            src="/assets/images/ui/aviso-vermelho.png"
            alt="Aviso de Pagamento" 
            className="w-full h-auto object-contain rounded-md" 
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">Acesso Restrito!</h2>
        <p className="text-lg mb-6">
          Para acessar este módulo, por favor, efetue o pagamento via Pix para a chave:
          <br /><br />
          <strong className="text-red-300 block text-2xl mb-2">{pixKey}</strong>
          <span className="block text-xl">{pixName}</span>
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Entendi
        </button>
      </div>
    </div>
  );
};

export default PaymentRequiredModal;