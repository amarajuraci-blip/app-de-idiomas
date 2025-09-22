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
    const checkSession = async () => {
      // Pergunta ao Supabase: "Existe um utilizador com uma sessão ativa agora?"
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        // Se não houver sessão ou houver um erro, não está autenticado
        setIsAuthenticated(false);
        navigate('/', { replace: true }); // Envia para a página de login
      } else {
        // Se houver uma sessão válida, está autenticado
        setIsAuthenticated(true);
      }
    };

    checkSession();

    // O Supabase também nos avisa se o estado de autenticação mudar (ex: o utilizador faz logout noutra aba)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAuthenticated(false);
        navigate('/', { replace: true });
      }
    });

    // Limpa o "ouvinte" quando o componente é desmontado (boa prática)
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Mostra uma tela de carregamento enquanto verificamos a sessão
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">A verificar acesso...</div>
      </div>
    );
  }

  // Se estiver autenticado, mostra o conteúdo protegido (as páginas do curso)
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;