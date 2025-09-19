import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center'; // Nova propriedade para controlar o alinhamento
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = '', align = 'left' }) => {
  const alignmentClasses = align === 'center'
    ? 'text-center mx-auto' // Classes para centralizar
    : 'text-left ml-2 md:ml-8 lg:ml-10'; // Classes para alinhar à esquerda (padrão)

  const lineClasses = align === 'center' ? 'mx-auto' : ''; // Centraliza a linha decorativa se necessário

  return (
    <div className={`mb-8 md:mb-12 ${alignmentClasses}`}>
      <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white ${className}`}>
        {children}
      </h2>
      <div className={`w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mt-3 md:mt-4 rounded-full ${lineClasses}`}></div>
    </div>
  );
};

export default SectionTitle;