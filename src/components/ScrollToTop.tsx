import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rola a janela para a posição (0, 0) - o topo da página
    window.scrollTo(0, 0);
  }, [pathname]); // Este efeito executa toda vez que a URL (pathname) muda

  return null; // Este componente não renderiza nada visível
}

export default ScrollToTop;