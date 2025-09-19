import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { allLanguageData } from '../data/modules';

interface LessonItemProps {
  title: string;
  thumbnailUrl: string;
  onClick: () => void;
}

const LessonItem: React.FC<LessonItemProps> = ({ title, thumbnailUrl, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer"
    >
      <h3 className="text-white font-semibold text-xl mb-3">
        {title}
      </h3>
      <div className="rounded-lg overflow-hidden relative">
        <img 
          src={thumbnailUrl} 
          alt={title} 
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play className="w-12 h-12 text-white" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

const Module1Page: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  
  const languageData = allLanguageData[lang || 'en'];
  const lessons = languageData.lessons;

  // Lógica simplificada: apenas navega
  const handleLessonClick = (lessonId: number) => {
    navigate(`/${lang}/modulo/1/aula/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 pt-6">
        <button 
          onClick={() => navigate(`/${lang}/home`)}
          className="flex items-center text-white hover:text-purple-400 transition-colors duration-300 text-lg group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Ver todos os módulos
        </button>
      </div>

      <section className="relative mt-6">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="https://i.postimg.cc/zv9FTXVL/01-B.png" 
          />
          <img 
            src="https://i.postimg.cc/jS64JTK5/01-A.png"
            alt="Banner Módulo 1"
            className="w-full h-[40vh] md:h-[50vh] object-cover"
          />
        </picture>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">MÓDULO 01</h1>
            <h2 className="text-xl md:text-2xl text-gray-300 font-medium">Módulos Principais</h2>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-8 px-4 md:px-0">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Aulas
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
        </div>
        
        <div className="space-y-6 px-4 md:px-0">
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              title={lesson.title}
              thumbnailUrl={lesson.thumbnailUrl}
              onClick={() => handleLessonClick(lesson.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module1Page;