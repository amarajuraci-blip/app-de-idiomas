import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InitialRouter: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenWarning = localStorage.getItem('hasSeenAudioWarning');
    
    if (hasSeenWarning) {
      // Se já viu o aviso, vai direto para a seleção de idiomas
      navigate('/selecao-idioma', { replace: true });
    } else {
      // Se for a primeira vez, vai para a página de boas-vindas
      navigate('/bem-vindo', { replace: true });
    }
  }, [navigate]);

  // Exibe uma tela de carregamento enquanto o redirecionamento acontece
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">A carregar...</div>
    </div>
  );
};

export default InitialRouter;