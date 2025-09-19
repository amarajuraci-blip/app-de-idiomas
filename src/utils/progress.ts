export const getProgress = (lang: string): { lastLessonCompleted: number; hasPlayedIntro: boolean } => {
  const progress = localStorage.getItem(`progress-${lang}`);
  if (progress) {
    return JSON.parse(progress);
  }
  return { lastLessonCompleted: 0, hasPlayedIntro: false };
};

export const saveLessonProgress = (lang: string, lessonId: number) => {
  const progressKey = `progress-${lang}`;
  const currentProgress = getProgress(lang);
  
  if (lessonId > currentProgress.lastLessonCompleted) {
    localStorage.setItem(progressKey, JSON.stringify({ ...currentProgress, lastLessonCompleted: lessonId }));
  }
};

export const markIntroAsPlayed = (lang: string) => {
  const progressKey = `progress-${lang}`;
  const currentProgress = getProgress(lang);
  localStorage.setItem(progressKey, JSON.stringify({ ...currentProgress, hasPlayedIntro: true }));
};