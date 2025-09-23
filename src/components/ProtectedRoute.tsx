import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Primeiro, verificamos se é um convidado
    const isGuest = localStorage.getItem('isGuest') === 'true';
    if (isGuest) {
      setIsAuthenticated(true);
      return; // Se for convidado, permite o acesso e não continua a verificação
    }

    // 2. Se não for um convidado, fazemos a verificação normal com o Supabase
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setIsAuthenticated(false);
        navigate('/', { replace: true });
      } else {
        setIsAuthenticated(true);
      }
    };

    checkSession();

    // Listener para o caso de o usuário fazer logout em outra aba
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        // Só redireciona se a sessão acabar E não for um convidado
        if (!session && !isGuest) {
            setIsAuthenticated(false);
            navigate('/', { replace: true });
        }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Tela de carregamento enquanto a verificação acontece
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">A verificar acesso...</div>
      </div>
    );
  }

  // Se estiver autenticado (seja como usuário ou convidado), mostra o conteúdo
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;