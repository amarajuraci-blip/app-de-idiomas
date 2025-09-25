// src/utils/progress.ts

export interface Progress {
  lastLessonCompleted: number;
  hasPlayedIntro: boolean;
  hasPlayedModule1Intro: boolean; // <-- Nova propriedade
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
      hasPlayedModule1Intro: false, // <-- Padrão
      lessonUnlockTimes: {},
      unlockedModules: [1],
      completedReviews: {},
      ...parsed,
    };
  }
  return {
    lastLessonCompleted: 0,
    hasPlayedIntro: false,
    hasPlayedModule1Intro: false, // <-- Padrão
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

        if (lessonId === 1) {
            unlockDelay = 10 * 60 * 1000;
        } else if (lessonId >= 2) {
            unlockDelay = 14 * 60 * 60 * 1000;
        }

        if (unlockDelay > 0) {
            const unlockTime = Date.now() + unlockDelay;
            newProgress.lessonUnlockTimes = {
                ...newProgress.lessonUnlockTimes,
                [nextLessonId]: unlockTime,
            };
        }
        localStorage.setItem(progressKey, JSON.stringify(newProgress));
    }
};

export const markIntroAsPlayed = (lang: string) => {
  const currentProgress = getProgress(lang);
  currentProgress.hasPlayedIntro = true;
  saveProgress(lang, currentProgress);
};

// <-- Nova função para marcar a introdução do Módulo 1 como tocada -->
export const markModule1IntroAsPlayed = (lang: string) => {
  const currentProgress = getProgress(lang);
  currentProgress.hasPlayedModule1Intro = true;
  saveProgress(lang, currentProgress);
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