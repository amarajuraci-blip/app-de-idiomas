import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Lock } from 'lucide-react';
import { allLanguageData } from '../data/modules';
import { getProgress, markModule1IntroAsPlayed } from '../utils/progress';
import { playAudioOnce } from '../utils/audioPlayer';

// ... (Os componentes CountdownTimer e LessonItem podem continuar os mesmos) ...
interface CountdownTimerProps {
  unlockTime: number;
  onTimerEnd: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ unlockTime, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(unlockTime - Date.now());

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerEnd();
      return;
    }

    const intervalId = setInterval(() => {
      const newTimeLeft = unlockTime - Date.now();
      if (newTimeLeft <= 0) {
        clearInterval(intervalId);
        onTimerEnd();
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [unlockTime, timeLeft, onTimerEnd]);

  if (timeLeft <= 0) {
    return null;
  }

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
      <Lock className="w-10 h-10 mb-2" />
      <div className="text-xl font-bold">
        {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="text-sm">Próxima aula liberada em</div>
    </div>
  );
};

interface LessonItemProps {
  title: string;
  thumbnailUrl: string;
  onClick: () => void;
  isLocked: boolean;
  unlockTime: number;
  onTimerEnd: () => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ title, thumbnailUrl, onClick, isLocked, unlockTime, onTimerEnd }) => {
  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={`group ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <h3 className="text-white font-semibold text-xl mb-3">
        {title}
      </h3>
      <div className={`rounded-lg overflow-hidden relative ${isLocked ? 'filter grayscale' : ''}`}>
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!isLocked && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-12 h-12 text-white" fill="currentColor" />
          </div>
        )}
        {isLocked && unlockTime > 0 && <CountdownTimer unlockTime={unlockTime} onTimerEnd={onTimerEnd} />}
        {isLocked && unlockTime === 0 && ( // Mostra um ícone de cadeado para o bloqueio de áudio
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <Lock className="w-10 h-10 text-white" />
            </div>
        )}
      </div>
    </div>
  );
};

const Module1Page: React.FC = () => {
    const navigate = useNavigate();
    const { lang } = useParams<{ lang: string }>();
    const [visibleLessons, setVisibleLessons] = useState<any[]>([]);
    const [_, setForceUpdate] = useState(0);

    // NOVO ESTADO: Controla o bloqueio temporário da Aula 1
    const [isLesson1AudioLocked, setIsLesson1AudioLocked] = useState(false);

    const languageData = allLanguageData[lang || 'en'];
    const allLessons = languageData.lessons;

    useEffect(() => {
        if (!lang) return;
        const progress = getProgress(lang);
        if (!progress.hasPlayedModule1Intro) {
            // 1. Bloqueia a aula 1, toca o áudio e marca como tocado
            setIsLesson1AudioLocked(true);
            playAudioOnce('module1_intro', '/audio/narrations/ingles/audio_02.mp3');
            markModule1IntroAsPlayed(lang);

            // 2. Agenda o desbloqueio para daqui a 12 segundos
            setTimeout(() => {
                setIsLesson1AudioLocked(false);
            }, 12000); // 12000 milissegundos = 12 segundos
        }
    }, [lang]);


    const updateLessons = useCallback(() => {
        const progress = getProgress(lang || 'en');
        const lastLessonCompleted = progress.lastLessonCompleted || 0;
        let lessonsToShow = allLessons.filter(lesson => lesson.id <= lastLessonCompleted + 1);
        
        const isGuest = localStorage.getItem('isGuest') === 'true';
        if (isGuest && lastLessonCompleted >= 2) {
             lessonsToShow = allLessons.filter(lesson => lesson.id <= 2);
        }

        setVisibleLessons(lessonsToShow.reverse());
    }, [lang, allLessons]);

    useEffect(() => {
        updateLessons();
    }, [updateLessons]);

    const handleTimerEnd = () => {
        setForceUpdate(Date.now());
        updateLessons();
    };

    const handleLessonClick = (lessonId: number) => {
        // Adiciona a verificação para o bloqueio do áudio
        if (lessonId === 1 && isLesson1AudioLocked) {
            return;
        }
        navigate(`/${lang}/modulo/1/aula/${lessonId}`);
    };

    return (
        <div className="min-h-screen bg-black">
          <div className="container mx-auto px-4 pt-6">
            <button
              onClick={() => navigate(`/${lang}/home`)}
              className="flex items-center text-white hover:text-purple-400 transition-colors duration-300 text-lg group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Ver todos os módulos
            </button>
          </div>

          <section className="relative mt-6">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="https://i.postimg.cc/zv9FTXVL/01-B.png"
              />
              <img
                src="https://i.postimg.cc/jS64JTK5/01-A.png"
                alt="Banner Módulo 1"
                className="w-full h-[40vh] md:h-[50vh] object-cover"
              />
            </picture>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
              <div className="container mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">MÓDULO 01</h1>
                <h2 className="text-xl md:text-2xl text-gray-300 font-medium">Módulos Principais</h2>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="mb-8 px-4 md:px-0">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Aulas
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            </div>

            <div className="space-y-6 px-4 md:px-0">
              {visibleLessons.map((lesson) => {
                 const progress = getProgress(lang || 'en');
                 const isCompleted = lesson.id <= progress.lastLessonCompleted;
                 const unlockTime = progress.lessonUnlockTimes?.[lesson.id] || 0;
                 
                 // LÓGICA DE BLOQUEIO ATUALIZADA
                 const isLockedByTimer = !isCompleted && Date.now() < unlockTime;
                 const isLockedByAudio = lesson.id === 1 && isLesson1AudioLocked;

                 const isLocked = isLockedByTimer || isLockedByAudio;

                return (
                  <LessonItem
                    key={lesson.id}
                    title={lesson.title}
                    thumbnailUrl={lesson.thumbnailUrl}
                    onClick={() => handleLessonClick(lesson.id)}
                    isLocked={isLocked}
                    unlockTime={isLockedByTimer ? unlockTime : 0} // Passa 0 para o bloqueio de áudio
                    onTimerEnd={handleTimerEnd}
                  />
                )
              })}
            </div>
          </div>
        </div>
      );
};

export default Module1Page;