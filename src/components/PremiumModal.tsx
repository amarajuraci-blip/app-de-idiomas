import React, { useState, useEffect } from 'react';
import { X, LockKeyhole, Copy, Check, Unlock } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixKey: string;
  price: string;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, pixKey, price }) => {
  const [view, setView] = useState<'payment' | 'password' | 'timer'>('payment');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const targetDate = new Date('2025-12-01T00:00:00');

  useEffect(() => {
    if (isOpen) {
      // VERIFICAÇÃO DE PERSISTÊNCIA
      const isPremium = localStorage.getItem('isPremium') === 'true';
      if (isPremium) {
        setView('timer'); // Se já for premium, vai direto para o cronômetro
      } else {
        setView('payment'); // Se não, começa no pagamento
      }
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (view === 'timer') {
      const interval = setInterval(() => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [view]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const handlePasswordSubmit = () => {
    if (password === '4708') {
      localStorage.setItem('isPremium', 'true'); // SALVA A PERSISTÊNCIA
      setView('timer');
    } else {
      setError('Senha Inválida');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-[#13131f] border border-purple-900/50 rounded-2xl p-6 text-center shadow-2xl shadow-purple-900/20">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* --- VISTA 1: PAGAMENTO --- */}
        {view === 'payment' && (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-purple-900/30 p-4 rounded-full">
                <LockKeyhole size={40} className="text-purple-400" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">Pagamento Pendente</h2>
            <p className="text-gray-400 text-sm mb-6">
              Libere o acesso completo a todos os idiomas e módulos avançados.
            </p>

            <div className="bg-[#1c1c2b] rounded-xl p-4 mb-6 flex items-center justify-between border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">Chave Pix (Celular)</p>
                  <p className="text-gray-400 text-xs truncate max-w-[150px]">{pixKey}</p>
                </div>
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-2 rounded-lg transition-colors"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>

            {/* BOTÃO ÚNICO QUE LEVA PARA A SENHA */}
            <button 
              onClick={() => setView('password')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-purple-700/30"
            >
              Confirmar Pagamento de {price}
            </button>
          </>
        )}

        {/* --- VISTA 2: SENHA --- */}
        {view === 'password' && (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-purple-900/30 p-4 rounded-full">
                <Unlock size={40} className="text-purple-400" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-4">Acesso Vip</h2>
            <p className="text-gray-400 text-sm mb-6">Digite a senha enviada no seu comprovante.</p>
            
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 mb-2 focus:outline-none focus:border-purple-500 text-center tracking-widest"
            />
            
            {error && <p className="text-red-500 text-sm mb-4 animate-pulse">{error}</p>}

            <button 
              onClick={handlePasswordSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-purple-700/30 mt-2"
            >
              Liberar Acesso
            </button>
            
            <button 
              onClick={() => setView('payment')}
              className="text-gray-500 hover:text-white text-xs mt-4"
            >
              Voltar
            </button>
          </>
        )}

        {/* --- VISTA 3: TEMPORIZADOR (PERSISTENTE) --- */}
        {view === 'timer' && (
          <>
            <div className="flex justify-center mb-6">
              <div className="bg-green-900/30 p-4 rounded-full border border-green-500/30">
                <Check size={40} className="text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Acesso Confirmado!</h2>
            <p className="text-gray-400 text-sm mb-6">
              Todas as senhas foram removidas.
            </p>

            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4 mb-6">
              <p className="text-purple-300 text-xs uppercase font-bold mb-2">Liberação Oficial</p>
              <div className="text-3xl font-mono text-white font-bold tracking-wider">
                01 DEZ 2025
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4 text-center">
                <div>
                  <span className="block text-xl font-bold text-white">{timeLeft.days}</span>
                  <span className="text-[10px] text-gray-400">DIAS</span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-white">{timeLeft.hours}</span>
                  <span className="text-[10px] text-gray-400">HRS</span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-white">{timeLeft.minutes}</span>
                  <span className="text-[10px] text-gray-400">MIN</span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-white">{timeLeft.seconds}</span>
                  <span className="text-[10px] text-gray-400">SEG</span>
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Fechar
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default PremiumModal;
