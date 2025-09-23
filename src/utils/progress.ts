export const getProgress = (lang: string): { lastLessonCompleted: number; hasPlayedIntro: boolean; lessonUnlockTimes: { [key: number]: number } } => {
    const progress = localStorage.getItem(`progress-${lang}`);
    if (progress) {
      return JSON.parse(progress);
    }
    return { lastLessonCompleted: 0, hasPlayedIntro: false, lessonUnlockTimes: {} };
};

export const saveLessonProgress = (lang: string, lessonId: number) => {
    const progressKey = `progress-${lang}`;
    const currentProgress = getProgress(lang);

    if (lessonId > currentProgress.lastLessonCompleted) {
        const newProgress = { ...currentProgress, lastLessonCompleted: lessonId };

        // Define o tempo de desbloqueio para a próxima aula
        const nextLessonId = lessonId + 1;
        let unlockDelay = 0;

        if (lessonId === 1) { // Após a aula 1
            unlockDelay = 10 * 60 * 1000; // 10 minutos
        } else if (lessonId >= 2) { // Após a aula 2 em diante
            unlockDelay = 14 * 60 * 60 * 1000; // 14 horas
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
    const progressKey = `progress-${lang}`;
    const currentProgress = getProgress(lang);
    localStorage.setItem(progressKey, JSON.stringify({ ...currentProgress, hasPlayedIntro: true }));
};