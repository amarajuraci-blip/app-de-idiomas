// src/utils/progress.ts

export interface Progress {
  lastLessonCompleted: number;
  hasPlayedIntro: boolean;
  hasPlayedModule1Intro: boolean;
  hasPlayedAudio03?: boolean;
  hasPlayedModule2Intro?: boolean;
  hasPlayedModule2Completion?: boolean;
  hasPlayedAudio06?: boolean;
  hasPlayedModule3Intro?: boolean;
  hasPlayedModule3Completion?: boolean;
  hasPlayedAudio09?: boolean;
  hasPlayedAudio13?: boolean;
  hasPlayedModule4Intro?: boolean;
  hasPlayedAudio11?: boolean;
  hasPlayedModule4Completion?: boolean;
  hasPlayedModule5Intro?: boolean;
  hasPlayedModule5Completion?: boolean;
  
  // Novos flags para os vídeos
  hasWatchedVal1?: boolean;
  hasWatchedPed1?: boolean;
  hasWatchedVal2?: boolean;
  hasWatchedPed2?: boolean;

  lessonUnlockTimes: { [key: number]: number };
  unlockedModules: number[];
  completedReviews: { [key: number]: boolean };
}

export const getProgress = (lang: string): Progress => {
  const progress = localStorage.getItem(`progress-${lang}`);
  if (progress) {
    const parsed = JSON.parse(progress);
    return {
      lastLessonCompleted: 0,
      hasPlayedIntro: false,
      hasPlayedModule1Intro: false,
      hasPlayedAudio03: false,
      hasPlayedModule2Intro: false,
      hasPlayedModule2Completion: false,
      hasPlayedAudio06: false,
      hasPlayedModule3Intro: false,
      hasPlayedModule3Completion: false,
      hasPlayedAudio09: false,
      hasPlayedAudio13: false,
      hasPlayedModule4Intro: false,
      hasPlayedAudio11: false,
      hasPlayedModule4Completion: false,
      hasPlayedModule5Intro: false,
      hasPlayedModule5Completion: false,
      
      hasWatchedVal1: false,
      hasWatchedPed1: false,
      hasWatchedVal2: false,
      hasWatchedPed2: false,

      lessonUnlockTimes: {},
      unlockedModules: [1],
      completedReviews: {},
      ...parsed,
    };
  }
  return {
    lastLessonCompleted: 0,
    hasPlayedIntro: false,
    hasPlayedModule1Intro: false,
    hasPlayedAudio03: false,
    hasPlayedModule2Intro: false,
    hasPlayedModule2Completion: false,
    hasPlayedAudio06: false,
    hasPlayedModule3Intro: false,
    hasPlayedModule3Completion: false,
    hasPlayedAudio09: false,
    hasPlayedAudio13: false,
    hasPlayedModule4Intro: false,
    hasPlayedAudio11: false,
    hasPlayedModule4Completion: false,
    hasPlayedModule5Intro: false,
    hasPlayedModule5Completion: false,
    
    hasWatchedVal1: false,
    hasWatchedPed1: false,
    hasWatchedVal2: false,
    hasWatchedPed2: false,

    lessonUnlockTimes: {},
    unlockedModules: [1],
    completedReviews: {},
  };
};

export const saveProgress = (lang: string, progress: Progress) => {
  localStorage.setItem(`progress-${lang}`, JSON.stringify(progress));
};

export const saveLessonProgress = (lang: string, lessonId: number) => {
    const progressKey = `progress-${lang}`;
    const currentProgress = getProgress(lang);
    if (lessonId > currentProgress.lastLessonCompleted) {
        const newProgress = { ...currentProgress, lastLessonCompleted: lessonId };
        if (lessonId === 1 && !newProgress.unlockedModules.includes(2)) {
          newProgress.unlockedModules.push(2);
        }
        const nextLessonId = lessonId + 1;
        let unlockDelay = 0;
        if (lessonId === 1) { unlockDelay = 10 * 60 * 1000; }
        else if (lessonId >= 2) { unlockDelay = 14 * 60 * 60 * 1000; }
        if (unlockDelay > 0) {
            const unlockTime = Date.now() + unlockDelay;
            newProgress.lessonUnlockTimes = { ...newProgress.lessonUnlockTimes, [nextLessonId]: unlockTime, };
        }
        localStorage.setItem(progressKey, JSON.stringify(newProgress));
    }
};

// Funções de marcação de áudio existentes
export const markIntroAsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedIntro = true; saveProgress(lang, p); };
export const markModule1IntroAsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedModule1Intro = true; saveProgress(lang, p); };
export const markAudio03AsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedAudio03 = true; saveProgress(lang, p); };
export const markModule2IntroAsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedModule2Intro = true; saveProgress(lang, p); };
export const markModule2CompletionAsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedModule2Completion = true; saveProgress(lang, p); };
export const markAudio06AsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedAudio06 = true; saveProgress(lang, p); };
export const markModule3IntroAsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedModule3Intro = true; saveProgress(lang, p); };
export const markModule3CompletionAsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedModule3Completion = true; saveProgress(lang, p); };
export const markAudio09AsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedAudio09 = true; saveProgress(lang, p); };
export const markModule4IntroAsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedModule4Intro = true; saveProgress(lang, p); };
export const markAudio11AsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedAudio11 = true; saveProgress(lang, p); };
export const markModule4CompletionAsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedModule4Completion = true; saveProgress(lang, p); };
export const markModule5IntroAsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedModule5Intro = true; saveProgress(lang, p); };
export const markModule5CompletionAsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedModule5Completion = true; saveProgress(lang, p); };
export const markAudio13AsPlayed = (lang: string) => { const p = getProgress(lang); p.hasPlayedAudio13 = true; saveProgress(lang, p); };

// Novas funções para marcar vídeos como assistidos
export const markVideoAsWatched = (lang: string, videoKey: 'val1' | 'ped1' | 'val2' | 'ped2') => {
    const p = getProgress(lang);
    if (videoKey === 'val1') p.hasWatchedVal1 = true;
    if (videoKey === 'ped1') p.hasWatchedPed1 = true;
    if (videoKey === 'val2') p.hasWatchedVal2 = true;
    if (videoKey === 'ped2') p.hasWatchedPed2 = true;
    saveProgress(lang, p);
};

// Função para desbloquear módulos específicos
export const unlockModules = (lang: string, moduleIds: number[]) => {
    const p = getProgress(lang);
    let changed = false;
    moduleIds.forEach(id => {
        if (!p.unlockedModules.includes(id)) {
            p.unlockedModules.push(id);
            changed = true;
        }
    });
    if (changed) saveProgress(lang, p);
};

export const completeFirstReview = (lang: string, moduleId: number) => {
  const progress = getProgress(lang);
  if (!progress.completedReviews[moduleId]) {
    progress.completedReviews[moduleId] = true;
    const nextModuleId = moduleId + 1;
    if (nextModuleId <= 5 && !progress.unlockedModules.includes(nextModuleId)) {
      progress.unlockedModules.push(nextModuleId);
    }
    saveProgress(lang, progress);
  }
};
