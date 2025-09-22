// src/utils/srs.ts

// Esta função calcula o próximo intervalo de revisão em horas, com base no nível SRS.
// Usamos uma variação do algoritmo SM-2, ajustado para ser um pouco mais agressivo no início.
const getNextInterval = (level: number): number => {
  if (level <= 0) return 4; // 4 horas para a primeira revisão
  if (level === 1) return 8; // 8 horas
  if (level === 2) return 24; // 1 dia
  if (level === 3) return 72; // 3 dias
  if (level === 4) return 168; // 1 semana
  if (level === 5) return 336; // 2 semanas
  if (level === 6) return 720; // 1 mês
  if (level === 7) return 1440; // 2 meses
  // A partir daqui, o intervalo cresce mais lentamente
  return 1440 + (level - 7) * 720;
};

// Esta é a função principal que vamos usar nos nossos módulos.
// Ela recebe o nível SRS atual e se o utilizador acertou a resposta.
export const calculateSrsLevel = (currentLevel: number, isCorrect: boolean) => {
  let newLevel;
  if (isCorrect) {
    // Se acertou, o nível aumenta.
    newLevel = currentLevel + 1;
  } else {
    // Se errou, o nível regride.
    // Regride 2 níveis, mas nunca menos que 0.
    newLevel = Math.max(0, currentLevel - 2);
  }

  // Calcula o próximo intervalo em horas.
  const intervalHours = getNextInterval(newLevel);

  // Cria a data da próxima revisão.
  const nextReviewDate = new Date();
  nextReviewDate.setHours(nextReviewDate.getHours() + intervalHours);

  return {
    newSrsLevel: newLevel,
    nextReviewAt: nextReviewDate.toISOString(), // Convertemos para o formato que o Supabase entende
  };
};