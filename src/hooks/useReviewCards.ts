import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { allLanguageData } from '../data/modules';

// --- FUNÇÕES DE LÓGICA ---

// Pega os dados de progresso do localStorage
const getProgress = (lang: string): { lastLessonCompleted: number } => {
  const progress = localStorage.getItem(`progress-${lang}`);
  if (progress) {
    return JSON.parse(progress);
  }
  return { lastLessonCompleted: 0 }; // Nenhum progresso ainda
};

// Embaralha um array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};


// --- O "CÉREBRO" (CUSTOM HOOK) ---

export const useReviewCards = () => {
  const { lang } = useParams<{ lang: string }>();
  const [reviewCards, setReviewCards] = useState<any[]>([]);

  useEffect(() => {
    if (!lang) return;

    // 1. Pega os dados do idioma e o progresso do aluno
    const languageData = allLanguageData[lang];
    const { lastLessonCompleted } = getProgress(lang);

    // 2. Coleta todos os cards das aulas que já foram completadas
    const allCompletedCards = languageData.lessons
      .filter(lesson => lesson.id <= lastLessonCompleted)
      .flatMap(lesson => lesson.cards);

    // 3. Define o limite de cards para a revisão
    const limit = lastLessonCompleted >= 11 ? 80 : 36;

    // 4. Embaralha os cards e aplica o limite
    const finalReviewSet = shuffleArray(allCompletedCards).slice(0, limit);

    setReviewCards(finalReviewSet);

  }, [lang]);

  return reviewCards;
};