import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';
import SectionTitle from './SectionTitle';
import ModuleCarousel from './ModuleCarousel';
import { allLanguageData } from '../data/modules';
import { getProgress, markIntroAsPlayed, markAudio03AsPlayed, markAudio06AsPlayed, markAudio09AsPlayed, markAudio13AsPlayed, markVideoAsWatched, unlockModules } from '../utils/progress';
import LockedModal from './LockedModal';
import PremiumModal from './PremiumModal'; 
// OBS: Certifique-se de que PaymentRequiredModal não está sendo importado se não for usado, ou remova a importação

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const progress = getProgress(lang || 'en');

  // --- MODAIS ---
  // Modal Roxo de aviso (mensagem simples)
  const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);
  const [lockedModalContent, setLockedModalContent] = useState({ title: '', message: '', buttonText: 'OK', onAction: () => {} });
  
  // NOVO Modal Premium (Pagamento + Senha)
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [premiumPrice, setPremiumPrice] = useState('R$ 29,90'); 

  // --- VÍDEO ---
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [currentVideoKey, setCurrentVideoKey] = useState<'val1' | 'ped1' | 'val2' | 'ped2' | null>(null);

  // Bloqueios de Áudio da Sessão 1
  const [isModule1AudioLocked, setIsModule1AudioLocked] = useState(false);
  const [isModule2AudioLocked, setIsModule2AudioLocked] = useState(false);
  const [isModule3AudioLocked, setIsModule3AudioLocked] = useState(false);
  const [isModule4AudioLocked, setIsModule4AudioLocked] = useState(false);
  const [isModule5AudioLocked, setIsModule5AudioLocked] = useState(false);

  useEffect(() => {
    if (!lang) return;
    const currentProgress = getProgress(lang);

    const playAndMark = (audioPath: string, markFunction: (lang: string) => void) => {
        try {
            const audio = new Audio(audioPath);
            audio.play().catch(err => console.error(`Erro ao tocar áudio ${audioPath}:`, err));
            markFunction(lang);
        } catch (error) {
            console.error(`Não foi possível criar o objeto de áudio para ${audioPath}:`, error);
        }
    };

    if (!currentProgress.hasPlayedIntro) {
        setIsModule1AudioLocked(true);
        playAndMark('/audio/narrations/ingles/audio_01.mp3', markIntroAsPlayed);
        
        // LÓGICA DE DESBLOQUEIO POR TEMPO (SESSÃO 2: IDs 16 e 17)
        setTimeout(() => {
            setIsModule1AudioLocked(false);
            unlockModules(lang, [16, 17]);
        }, 14000);
    }
    
    // Lógica dos outros áudios
    if (currentProgress.lastLessonCompleted >= 1 && !currentProgress.hasPlayedAudio03) {
        setIsModule2AudioLocked(true);
        playAndMark('/audio/narrations/ingles/audio_03.mp3', markAudio03AsPlayed);
        setTimeout(() => setIsModule2AudioLocked(false), 10000);
    }
    if (currentProgress.completedReviews[2] && !currentProgress.hasPlayedAudio06) {
        setIsModule3AudioLocked(true);
        playAndMark('/audio/narrations/ingles/audio_06.mp3', markAudio06AsPlayed);
        setTimeout(() => setIsModule3AudioLocked(false), 6000);
    }
    if (currentProgress.completedReviews[3] && !currentProgress.hasPlayedAudio09) {
        setIsModule4AudioLocked(true);
        playAndMark('/audio/narrations/ingles/audio_09.mp3', markAudio09AsPlayed);
        setTimeout(() => setIsModule4AudioLocked(false), 7000);
    }
    if (currentProgress.completedReviews[4] && !currentProgress.hasPlayedAudio13) {
        setIsModule5AudioLocked(true);
        playAndMark('/audio/narrations/ingles/audio_13.mp3', markAudio13AsPlayed);
        setTimeout(() => setIsModule5AudioLocked(false), 10000);
    }
  }, [lang]);

  const handleVideoEnd = () => {
    if (!currentVideoKey || !lang) {
        setCurrentVideoUrl(null);
        return;
    }

    markVideoAsWatched(lang, currentVideoKey);
    setCurrentVideoUrl(null);

    // Se for vídeo da fase 2 (Pós-Módulo 5), abre o modal roxo, que depois leva ao Premium
    if (currentVideoKey === 'val2' || currentVideoKey === 'ped2') {
        setLockedModalContent({
            title: 'Vamos praticar!',
            message: 'Vamos usar as palavras que você acabou de estudar e formar frases.',
            buttonText: 'INICIAR',
            onAction: () => {
                setIsLockedModalOpen(false);
                setPremiumPrice('R$ 19,90');
                setIsPremiumModalOpen(true); // Abre o Modal Premium
            }
        });
        setIsLockedModalOpen(true);
    }
    
    setCurrentVideoKey(null);
  };

  const handleModuleClick = (moduleId: number) => {
    // 1. Bloqueios de áudio (Sessão 1)
    if (moduleId === 1 && isModule1AudioLocked) return;
    if (moduleId === 2 && isModule2AudioLocked) return;
    if (moduleId === 3 && isModule3AudioLocked) return;
    if (moduleId === 4 && isModule4AudioLocked) return;
    if (moduleId === 5 && isModule5AudioLocked) return;

    // --- SESSÃO 2 (Conversation - IDs 16 e 17) ---
    if (moduleId === 16 || moduleId === 17) {
        // FASE 1: Módulo 5 NÃO completado
        if (!progress.unlockedModules.includes(5)) { 
            const videoKey = moduleId === 16 ? 'val1' : 'ped1';
            const hasWatched = moduleId === 16 ? progress.hasWatchedVal1 : progress.hasWatchedPed1;

            if (!hasWatched) {
                setCurrentVideoKey(videoKey);
                setCurrentVideoUrl(`/${videoKey}.mp4`);
            } else {
                // Já viu, mostra mensagem de bloqueio
                setLockedModalContent({
                    title: 'Acesso Restrito',
                    message: 'Conclua os 5 módulos acima para liberar todos os recursos de conversação.',
                    buttonText: 'OK',
                    onAction: () => setIsLockedModalOpen(false)
                });
                setIsLockedModalOpen(true);
            }
            return;
        } 
        
        // FASE 2: Módulo 5 JÁ completado
        else {
            const videoKey = moduleId === 16 ? 'val2' : 'ped2';
            const hasWatched = moduleId === 16 ? progress.hasWatchedVal2 : progress.hasWatchedPed2;

            if (!hasWatched) {
                setCurrentVideoKey(videoKey);
                setCurrentVideoUrl(`/${videoKey}.mp4`);
            } else {
                // Já viu o vídeo novo, abre direto o modal Premium
                setPremiumPrice('R$ 19,90');
                setIsPremiumModalOpen(true);
            }
            return;
        }
    }

    // --- SESSÃO 3 e 4 (Advanced e Reading) ---
    // Se clicar, abre o Modal Premium
    if ((moduleId >= 6 && moduleId <= 15) || (moduleId >= 26)) {
        setPremiumPrice('R$ 29,90'); 
        setIsPremiumModalOpen(true);
        return;
    }

    // Navegação normal para Sessão 1
    const isUnlockedSequentially = progress.unlockedModules.includes(moduleId);
    if (!isUnlockedSequentially) {
      if (moduleId === 16 || moduleId === 17) return; 
      alert(`Complete o módulo ${moduleId - 1} para desbloquear este!`);
      return;
    }

    const path = `/${lang}/modulo/${moduleId}`;
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('isGuest');
    supabase.auth.signOut();
    navigate('/', { replace: true });
  };

  const { main: mainModules, advanced: advancedModules, listeningPractice, readingAndWriting } = allLanguageData[lang || 'en'].homePageModules;

  return (
    <div className="min-h-screen bg-black pb-20">
        
        {/* Modal Simples Roxo */}
        <LockedModal 
            isOpen={isLockedModalOpen} 
            onClose={() => setIsLockedModalOpen(false)}
            onAction={lockedModalContent.onAction}
            title={lockedModalContent.title}
            message={lockedModalContent.message}
            buttonText={lockedModalContent.buttonText}
        />

        {/* NOVO Modal Premium (Com senha e timer) */}
        <PremiumModal 
            isOpen={isPremiumModalOpen} 
            onClose={() => setIsPremiumModalOpen(false)}
            pixKey="81995148260"
            price={premiumPrice}
        />

        {/* Player de Vídeo */}
        {currentVideoUrl && (
            <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
                <video 
                    src={currentVideoUrl}
                    autoPlay 
                    className="w-full h-full object-contain"
                    onEnded={handleVideoEnd}
                >
                    Seu navegador não suporta vídeos.
                </video>
            </div>
        )}

        <div className="absolute top-4 right-4 z-50">
            <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-300 border border-gray-700 hover:border-gray-600">
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Sair</span>
            </button>
        </div>

        <section className="relative">
            {lang === 'en' ? ( 
                <picture> <source media="(max-width: 768px)" srcSet="/images/visual/capa_en_cell.webp" /> <img src="/images/visual/capa_en_pc.webp" alt="Banner Principal" className="w-full h-[40vh] md:h-[60vh] object-cover" /> </picture>
            ) : ( <img src="https://i.imgur.com/ru9WoNh.jpg" alt="Banner Principal" className="w-full h-[40vh] md:h-[60vh] object-cover" />)}
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </section>

        <div className="container mx-auto px-4 py-16 max-w-7xl">
            {/* SESSÃO 1 */}
            <section className="mb-12 md:mb-20">
                <SectionTitle>PRIMEIRA SESSÃO - VOCABULÁRIO:</SectionTitle>
                <ModuleCarousel
                    modules={mainModules.map(module => ({
                        ...module,
                        isLocked: !progress.unlockedModules.includes(module.id) || (module.id === 1 && isModule1AudioLocked) || (module.id === 2 && isModule2AudioLocked) || (module.id === 3 && isModule3AudioLocked) || (module.id === 4 && isModule4AudioLocked) || (module.id === 5 && isModule5AudioLocked)
                    }))}
                    sectionType="course"
                    onModuleClick={handleModuleClick}
                />
            </section>

            {/* SESSÃO 2 */}
            <section className="mb-12 md:mb-20">
                <SectionTitle>SEGUNDA SESSÃO – CONVERSAÇÃO NATURAL:</SectionTitle>
                <ModuleCarousel
                    modules={listeningPractice.map(module => ({
                        ...module,
                        isLocked: !progress.unlockedModules.includes(module.id)
                    }))}
                    sectionType="bonus"
                    onModuleClick={handleModuleClick}
                />
            </section>

            {/* SESSÃO 3 */}
            <section className="mb-12 md:mb-20">
                <SectionTitle>TERCEIRA SESSÃO - FRASES E DIÁLOGOS:</SectionTitle>
                <ModuleCarousel
                    modules={advancedModules.map(module => ({
                        ...module,
                        isLocked: true 
                    }))}
                    sectionType="howto"
                    onModuleClick={handleModuleClick}
                />
            </section>

            {/* SESSÃO 4 */}
            <section className="mb-12 md:mb-20">
                <SectionTitle>QUARTA SESSÃO – LEITURA E ESCRITA:</SectionTitle>
                <ModuleCarousel
                    modules={readingAndWriting.map(module => ({
                        ...module,
                        isLocked: true
                    }))}
                    sectionType="course"
                    onModuleClick={handleModuleClick}
                />
            </section>
        </div>
        
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Seu Curso de Idiomas</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">A sua jornada para a fluência começa aqui.</p>
            </div>
        </footer>
    </div>
  );
};

export default HomePage;
