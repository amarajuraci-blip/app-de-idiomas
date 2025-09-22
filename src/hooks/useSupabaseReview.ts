// src/hooks/useSupabaseReview.ts
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { allLanguageData } from '../data/modules';
import { calculateSrsLevel } from '../utils/srs';

// Definimos uma estrutura mais completa para os nossos cards de revisão
export interface ReviewCard {
  card_id: number;
  user_id: string;
  srs_level: number;
  next_review_at: string;
  // Adicionamos os detalhes do card que vêm do nosso ficheiro modules.ts
  portuguese: string;
  translation: string;
  imageUrl: string;
  audioUrl: string;
}

export const useSupabaseReview = () => {
  const { lang } = useParams<{ lang: string }>();
  const [reviewCards, setReviewCards] = useState<ReviewCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviewCards = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Obter o utilizador atual
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        throw new Error('Utilizador não autenticado.');
      }
      const user = session.user;

      // 2. Buscar os cards que precisam de ser revistos no Supabase
      const now = new Date().toISOString();
      const { data: progressData, error: progressError } = await supabase
        .from('card_progress')
        .select('*')
        .eq('user_id', user.id)
        .lte('next_review_at', now); // A "magia" acontece aqui: só busca cards cuja data de revisão já passou

      if (progressError) {
        throw new Error('Erro ao buscar o progresso dos cards.');
      }

      // 3. Juntar os dados do Supabase com os dados locais
      if (progressData && lang) {
        const allCardsForLanguage = allLanguageData[lang]?.lessons.flatMap(l => l.cards) || [];
        
        const mergedCards = progressData.map(progress => {
          const cardDetails = allCardsForLanguage.find(c => c.id === progress.card_id);
          return {
            ...progress,
            ...cardDetails,
          };
        }).filter(card => card.translation); // Garante que só incluímos cards que foram encontrados

        setReviewCards(mergedCards as ReviewCard[]);
      }

    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [lang]);

  // Função para atualizar o progresso de um card
  const updateCardProgress = async (card_id: number, current_srs_level: number, isCorrect: boolean) => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error("Sessão não encontrada.");

        const { newSrsLevel, nextReviewAt } = calculateSrsLevel(current_srs_level, isCorrect);

        const { error } = await supabase
            .from('card_progress')
            .update({
                srs_level: newSrsLevel,
                next_review_at: nextReviewAt,
                last_reviewed_at: new Date().toISOString()
            })
            .eq('user_id', session.user.id)
            .eq('card_id', card_id);

        if (error) throw error;

    } catch (e) {
        console.error("Erro ao atualizar o progresso do card:", e);
    }
  };


  useEffect(() => {
    fetchReviewCards();
  }, [fetchReviewCards]);

  return { reviewCards, isLoading, error, fetchReviewCards, updateCardProgress };
};