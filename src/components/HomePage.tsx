import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import SectionTitle from './SectionTitle';
import ModuleCarousel from './ModuleCarousel';
import { allLanguageData } from '../data/modules';
import { getProgress } from '../utils/progress'; // <-- Importamos nosso utilitário

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const languageData = allLanguageData[lang || 'en'];
  const progress = getProgress(lang || 'en'); // <-- Lemos o progresso do aluno

  const handleModuleClick = (moduleId: number) => {
    const isUnlocked = progress.unlockedModules.includes(moduleId);

    if (!isUnlocked) {
      alert(`Complete o módulo ${moduleId - 1} para desbloquear este!`);
      return;
    }

    // Navegação padrão se o módulo estiver desbloqueado
    const path = `/${lang}/modulo/${moduleId}`;
    navigate(path);
  };

  const handleLogout = () => {
    // Limpa o progresso de convidado e a sessão do Supabase
    localStorage.removeItem('isGuest');
    localStorage.removeItem(`progress-${lang}`);
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-300 border border-gray-700 hover:border-gray-600"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
      <section className="relative">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="https://i.imgur.com/nkjNoNO.jpg"
          />
          <img
            src="https://i.imgur.com/ru9WoNh.jpg"
            alt="Banner Principal"
            className="w-full h-[40vh] md:h-[60vh] object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </section>
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <section className="mb-12 md:mb-20">
          <SectionTitle>
            <span className="text-blue-400">♦</span> Módulos Principais <span className="text-blue-400">♦</span>
          </SectionTitle>
          <ModuleCarousel
            modules={languageData.homePageModules.main.map(module => ({
              ...module,
              isLocked: !progress.unlockedModules.includes(module.id) // <-- Adicionamos o estado de bloqueio
            }))}
            sectionType="course"
            onModuleClick={handleModuleClick}
          />
        </section>
        <section className="mb-12 md:mb-20">
          <SectionTitle>
            <span className="text-green-400">♦</span> Módulos Avançados <span className="text-green-400">♦</span>
          </SectionTitle>
           {/* Módulos avançados podem ter sua própria lógica de bloqueio se necessário */}
          <ModuleCarousel
            modules={languageData.homePageModules.advanced}
            sectionType="howto"
            onModuleClick={(moduleId) => alert(`Módulo ${moduleId} em desenvolvimento!`)}
          />
        </section>
      </div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Seu Curso de Idiomas
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A sua jornada para a fluência começa aqui.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;