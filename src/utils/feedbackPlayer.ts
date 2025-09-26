// src/utils/feedbackPlayer.ts

const playSound = (path: string) => {
  try {
    const audio = new Audio(path);
    audio.play().catch(error => console.error(`Erro ao tocar ${path}:`, error));
  } catch (error) {
    console.error(`Não foi possível criar o áudio para ${path}:`, error);
  }
};

export const playFeedbackAudio = (isCorrect: boolean) => {
  if (isCorrect) {
    // Toca o som de "acertou"
    playSound('/audio/narrations/efeito/acertou.mp3');

    // Sorteia e toca um dos 5 áudios de acerto
    const randomCorrectSound = Math.floor(Math.random() * 5) + 1;
    const correctSoundPath = `/audio/narrations/efeito/certo_0${randomCorrectSound}.mp3`;
    playSound(correctSoundPath);
  } else {
    // Toca o som de "errou"
    playSound('/audio/narrations/efeito/errou.mp3');

    // Sorteia e toca um dos 5 áudios de erro
    const randomWrongSound = Math.floor(Math.random() * 5) + 1;
    const wrongSoundPath = `/audio/narrations/efeito/errou_0${randomWrongSound}.mp3`;
    playSound(wrongSoundPath);
  }
};