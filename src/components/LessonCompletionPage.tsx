import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { allLanguageData } from '../data/modules';

const getLanguageFolderName = (langCode: string): string => {
  const map: { [key: string]: string } = {
    en: 'ingles',
    jp: 'japones',
    kr: 'coreano',
    fr: 'frances',
  };
  return map[langCode] || 'ingles';
};

const LessonCompletionPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang, lessonId: lessonIdStr } = useParams<{ lang: string; lessonId: string }>();
  const lessonId = parseInt(lessonIdStr || '0', 10);

  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [isRegistering, setIsRegistering] = useState(true);
  const audioPlayedRef = useRef(false);

  useEffect(() => {
    const registerLessonCards = async () => {
      if (!lang || !lessonId) {
        setIsRegistering(false);
        return;
      }
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) throw new Error('Utilizador não autenticado.');
        const user = session.user;

        const lesson = allLanguageData[lang]?.lessons.find(l => l.id === lessonId);
        if (!lesson) throw new Error('Lição não encontrada.');
        const lessonCards = lesson.cards;

        const { data: existingProgress } = await supabase
          .from('card_progress')
          .select('card_id')
          .eq('user_id', user.id)
          .in('card_id', lessonCards.map(c => c.id));

        const existingCardIds = new Set((existingProgress || []).map(p => p.card_id));
        
        const newCardsToInsert = lessonCards
          .filter(card => !existingCardIds.has(card.id))
          .map(card => {
            return {
              user_id: user.id,
              card_id: card.id,
              srs_level: 0,
              next_review_at: new Date().toISOString(),
            };
          });

        if (newCardsToInsert.length > 0) {
          const { error: insertError } = await supabase.from('card_progress').insert(newCardsToInsert);
          if (insertError) throw insertError;
        }

      } catch (e: any) {
        console.error("Erro ao registar o progresso da lição:", e.message);
      } finally {
        setIsRegistering(false);
      }
    };

    registerLessonCards();
  }, [lang, lessonId]);

  useEffect(() => {
    // Se a referência já estiver marcada como 'true', significa que o áudio
    // já foi iniciado, então saímos para evitar qualquer lógica duplicada.
    if (audioPlayedRef.current) {
      return;
    }

    if (lang) {
      // Marcamos que vamos iniciar o áudio.
      audioPlayedRef.current = true;
      
      const folderName = getLanguageFolderName(lang);
      const audio = new Audio(`/audio/narrations/${folderName}/aula_concluida.mp3`);
      
      // O botão só será liberado quando o áudio terminar.
      audio.onended = () => setIsAudioPlaying(false);
      
      audio.play().catch(error => {
        console.error("Erro ao tocar o áudio de conclusão:", error);
        // Se der erro, também liberamos o botão.
        setIsAudioPlaying(false);
      });
    } else {
      // Se não houver 'lang', não há áudio para tocar, então liberamos o botão.
      setIsAudioPlaying(false);
    }
  }, [lang]);

  const isButtonDisabled = isAudioPlaying || isRegistering;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="animate-fade-in-down">
        <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Parabéns!</h1>
        <p className="text-lg text-gray-400 max-w-md mx-auto mb-8">
          Todo o conteúdo que estudamos já está disponível nos outros módulos. Você já pode ir para o Módulo 2 e começar suas revisões diárias. Estarei te esperando lá!
        </p>
        <button
          onClick={() => navigate(`/${lang}/home`)}
          disabled={isButtonDisabled}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center mx-auto group transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isRegistering ? 'A guardar progresso...' : 'Ir para o Início'}
          {!isRegistering && <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />}
        </button>
      </div>
    </div>
  );
};

export default LessonCompletionPage;