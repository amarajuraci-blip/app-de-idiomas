// src/utils/audioPlayer.ts

const playedAudios = new Set<string>();

export const playAudioOnce = (audioKey: string, audioPath: string) => {
  if (playedAudios.has(audioKey)) {
    return;
  }
  playedAudios.add(audioKey);

  try {
    const audio = new Audio(audioPath);
    audio.play().catch(err => {
      console.error(`Erro ao tocar o áudio ${audioKey}:`, err);
    });
  } catch (error) {
    console.error(`Não foi possível criar o objeto de áudio para ${audioKey}:`, error);
  }
};