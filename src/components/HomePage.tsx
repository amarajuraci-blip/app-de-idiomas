import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { supabase } from '../supabaseClient';
import SectionTitle from './SectionTitle';
import ModuleCarousel from './ModuleCarousel';
import { allLanguageData } from '../data/modules';
import { getProgress, markIntroAsPlayed, markAudio03AsPlayed, markAudio06AsPlayed, markAudio09AsPlayed, markAudio13AsPlayed, markVideoAsWatched, unlockModules } from '../utils/progress';
import WarningModal from './WarningModal';
import LockedModal from './LockedModal';
import PaymentRequiredModal from './PaymentRequiredModal';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const progress = getProgress(lang || 'en');

  // Modais
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isLockedModalOpen, setIsLockedModalOpen] = useState(false);
  const [lockedModalContent, setLockedModalContent] = useState({ title: '', message: '', buttonText: 'OK', onAction: () => {} });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Vídeo
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [currentVideoKey, setCurrentVideoKey] = useState<'val1' | 'ped1' | 'val2' | 'ped2' | null>(null);

  // Bloqueios de Áudio da Sessão 1
  const [isModule1AudioLocked, setIsModule1AudioLocked] = useState(false);
  const [isModule2AudioLocked, setIsModule2AudioLocked] = useState(false);
  const [isModule3AudioLocked, setIsModule3AudioLocked] = useState(false);
  const [isModule4AudioLocked, setIsModule4AudioLocked] = useState(false);
  const [isModule5AudioLocked, setIsModule5AudioLocked] = useState(false);

  // Verifica se o Módulo 5 da Sessão 1 foi completado
  const isModule5Completed = progress.lastLessonCompleted >= 5; // Assumindo que lessonId 5 é o fim do Mod 5, ou use unlockedModules

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
        
        // --- LÓGICA DE DESBLOQUEIO POR TEMPO (SESSÃO 2: IDs 16 e 17) ---
        setTimeout(() => {
            setIsModule1AudioLocked(false);
            unlockModules(lang, [16, 17]); // Desbloqueia visualmente os módulos da Sessão 2
        }, 14000);
    }
    
    // Lógica dos outros áudios (mantida)
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

    // Marca como assistido
    markVideoAsWatched(lang, currentVideoKey);
    setCurrentVideoUrl(null); // Fecha o vídeo

    // Se for vídeo da fase 2 (Pós-Módulo 5), abre o modal lilás
    if (currentVideoKey === 'val2' || currentVideoKey === 'ped2') {
        setLockedModalContent({
            title: 'Vamos praticar!',
            message: 'Vamos usar as palavras que você acabou de estudar e formar frases.',
            buttonText: 'INICIAR',
            onAction: () => {
                setIsLockedModalOpen(false);
                setIsPaymentModalOpen(true); // Abre pagamento
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
        // Se o módulo 5 NÃO foi completado
        if (!progress.unlockedModules.includes(5)) { // Usando unlockedModules para garantir
            const videoKey = moduleId === 16 ? 'val1' : 'ped1';
            const hasWatched = moduleId === 16 ? progress.hasWatchedVal1 : progress.hasWatchedPed1;

            if (!hasWatched) {
                setCurrentVideoKey(videoKey);
                setCurrentVideoUrl(`/${videoKey}.mp4`);
            } else {
                // Já viu, mostra bloqueio
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
        
        // Se o módulo 5 JÁ foi completado (Fase 2)
        else {
            const videoKey = moduleId === 16 ? 'val2' : 'ped2';
            const hasWatched = moduleId === 16 ? progress.hasWatchedVal2 : progress.hasWatchedPed2;

            if (!hasWatched) {
                setCurrentVideoKey(videoKey);
                setCurrentVideoUrl(`/${videoKey}.mp4`);
            } else {
                // Já viu o vídeo novo, vai direto para pagamento
                setIsPaymentModalOpen(true);
            }
            return;
        }
    }

    // --- SESSÃO 3 (Advanced - IDs 6 a 15) ---
    if (moduleId >= 6 && moduleId <= 15) {
        // Mantém bloqueado/aviso se não estiver liberado
        // Por enquanto, vamos supor que libera com o Mod 5 também
        if (progress.unlockedModules.includes(5)) {
             setIsWarningOpen(true); // Placeholder
        }
        return;
    }

    // Navegação normal para Sessão 1
    const isUnlockedSequentially = progress.unlockedModules.includes(moduleId);
    if (!isUnlockedSequentially) {
      // Se for ID 16/17 e ainda não tiver liberado pelo tempo (raro, mas possível)
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
        <WarningModal isOpen={isWarningOpen} onClose={() => setIsWarningOpen(false)} />
        
        <LockedModal 
            isOpen={isLockedModalOpen} 
            onClose={() => setIsLockedModalOpen(false)}
            onAction={lockedModalContent.onAction}
            title={lockedModalContent.title}
            message={lockedModalContent.message}
            buttonText={lockedModalContent.buttonText}
        />

        <PaymentRequiredModal 
            isOpen={isPaymentModalOpen} 
            onClose={() => setIsPaymentModalOpen(false)}
            pixKey="81920011267"
            pixName="Ewerton David de Matos Gonçalo - R$19,90 (Inglês) ou R$29,90 (Todos)"
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
            {/* POSIÇÃO 1: SESSÃO 1 (VOCABULÁRIO) */}
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

            {/* POSIÇÃO 2: SESSÃO 2 (ANTIGA CONVERSAÇÃO - IDs 16+) */}
            <section className="mb-12 md:mb-20">
                <SectionTitle>SEGUNDA SESSÃO – CONVERSAÇÃO NATURAL:</SectionTitle>
                <ModuleCarousel
                    modules={listeningPractice.map(module => ({
                        ...module,
                        // Desbloqueia se estiver na lista de desbloqueados (16 e 17 entram via timeout)
                        isLocked: !progress.unlockedModules.includes(module.id)
                    }))}
                    sectionType="bonus"
                    onModuleClick={handleModuleClick}
                />
            </section>

            {/* POSIÇÃO 3: SESSÃO 3 (ANTIGA AVANÇADO - IDs 6+) */}
            <section className="mb-12 md:mb-20">
                <SectionTitle>TERCEIRA SESSÃO - FRASES E DIÁLOGOS:</SectionTitle>
                <ModuleCarousel
                    modules={advancedModules.map(module => ({
                        ...module,
                        // Bloqueado até segunda ordem (ou até mod 5 ser feito)
                        isLocked: !progress.unlockedModules.includes(5) 
                    }))}
                    sectionType="howto"
                    onModuleClick={handleModuleClick}
                />
            </section>

            {/* POSIÇÃO 4: SESSÃO 4 (LEITURA - Mantida) */}
            <section className="mb-12 md:mb-20">
                <SectionTitle>QUARTA SESSÃO – LEITURA E ESCRITA:</SectionTitle>
                <ModuleCarousel
                    modules={readingAndWriting.map(module => ({
                        ...module,
                        isLocked: !areAdvancedModulesUnlocked // Mantido como estava
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
