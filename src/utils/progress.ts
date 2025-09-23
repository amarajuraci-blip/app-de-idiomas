// src/utils/progress.ts

export interface Progress {
  lastLessonCompleted: number;
  hasPlayedIntro: boolean;
  lessonUnlockTimes: { [key: number]: number };
  unlockedModules: number[]; // <-- Nossa nova propriedade!
  completedReviews: { [key: number]: boolean }; // <-- Para rastrear a 1ª revisão
}

export const getProgress = (lang: string): Progress => {
  const progress = localStorage.getItem(`progress-${lang}`);
  if (progress) {
    const parsed = JSON.parse(progress);
    // Garante que os valores padrão existam se o progresso salvo for antigo
    return {
      lastLessonCompleted: 0,
      hasPlayedIntro: false,
      lessonUnlockTimes: {},
      unlockedModules: [1], // Módulo 1 sempre desbloqueado
      completedReviews: {},
      ...parsed,
    };
  }
  // Estado inicial para um novo aluno
  return {
    lastLessonCompleted: 0,
    hasPlayedIntro: false,
    lessonUnlockTimes: {},
    unlockedModules: [1],
    completedReviews: {},
  };
};

// Função genérica para salvar qualquer progresso atualizado
export const saveProgress = (lang: string, progress: Progress) => {
  localStorage.setItem(`progress-${lang}`, JSON.stringify(progress));
};


export const saveLessonProgress = (lang: string, lessonId: number) => {
    const progressKey = `progress-${lang}`;
    const currentProgress = getProgress(lang);

    if (lessonId > currentProgress.lastLessonCompleted) {
        const newProgress = { ...currentProgress, lastLessonCompleted: lessonId };

        // Desbloqueia o Módulo 2 ao concluir a Aula 1
        if (lessonId === 1 && !newProgress.unlockedModules.includes(2)) {
          newProgress.unlockedModules.push(2);
        }

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

// Nova função para marcar a primeira revisão de um módulo como concluída
export const completeFirstReview = (lang: string, moduleId: number) => {
  const progress = getProgress(lang);

  // Se a primeira revisão deste módulo ainda não foi feita
  if (!progress.completedReviews[moduleId]) {
    progress.completedReviews[moduleId] = true;

    // Desbloqueia o próximo módulo
    const nextModuleId = moduleId + 1;
    if (nextModuleId <= 5 && !progress.unlockedModules.includes(nextModuleId)) {
      progress.unlockedModules.push(nextModuleId);
    }
    saveProgress(lang, progress);
  }
};