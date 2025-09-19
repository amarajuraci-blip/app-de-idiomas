interface Card {
  id: number;
  portuguese: string;
  translation: string; // 'english', 'japanese', etc.
  imageUrl: string;
  audioUrl: string;
}

interface Lesson {
  id: number;
  title: string;
  thumbnailUrl: string;
  cards: Card[];
}

interface LanguageData {
  homePageModules: {
    main: { id: number; title: string; imageUrl: string; }[];
    advanced: { id: number; title: string; imageUrl: string; }[];
  };
  lessons: Lesson[];
}

// ========================================================================
// --- DADOS EM INGLÊS ---
// ========================================================================
const englishData: LanguageData = {
  homePageModules: {
    main: [
      { id: 1, title: "Módulo 01", imageUrl: "https://i.postimg.cc/PrPSWk4S/01-INSTRU-ES.png" },
      { id: 2, title: "Módulo 02", imageUrl: "https://i.postimg.cc/qBmm678t/02-Grupo-de-Atividades-EXTRA.png" },
      { id: 3, title: "Módulo 03", imageUrl: "https://i.postimg.cc/hvGp3FqP/03-Primeiros-Tra-os.png" },
      { id: 4, title: "Módulo 04", imageUrl: "https://i.postimg.cc/gjB4CMYy/04-Simplifica-o-Geom-trica.png" },
      { id: 5, title: "Módulo 05", imageUrl: "https://i.postimg.cc/GhZhrGmd/3.png" }
    ],
    advanced: [
      // ...pode adicionar módulos avançados aqui
    ],
  },
  lessons: [
    { 
      id: 1, 
      title: "Aula 01: Começando!", 
      thumbnailUrl: "https://i.postimg.cc/QNw4hkv6/01.png",
      cards: [
        { id: 101, portuguese: 'Sino', translation: 'Bell', imageUrl: '/images/aula1/Bell.webp', audioUrl: '/audio/ingles/bell.mp3' },
        { id: 102, portuguese: 'Bicicleta', translation: 'Bicycle', imageUrl: '/images/aula1/bicycle.webp', audioUrl: '/audio/ingles/bicycle.mp3' },
        { id: 103, portuguese: 'Casa', translation: 'House', imageUrl: '/images/aula1/House.webp', audioUrl: '/audio/ingles/house.mp3' },
        { id: 104, portuguese: 'Cachorro', translation: 'Dog', imageUrl: '/images/aula1/dog.webp', audioUrl: '/audio/ingles/dog.mp3' },
        { id: 105, portuguese: 'Praia', translation: 'Beach', imageUrl: '/images/aula1/beach.webp', audioUrl: '/audio/ingles/beach.mp3' },
        { id: 106, portuguese: 'Estrela', translation: 'Star', imageUrl: '/images/aula1/star.webp', audioUrl: '/audio/ingles/star.mp3' },
        { id: 107, portuguese: 'Porta', translation: 'Door', imageUrl: '/images/aula1/door.webp', audioUrl: '/audio/ingles/door.mp3' },
        { id: 108, portuguese: 'Flor', translation: 'Flower', imageUrl: '/images/aula1/Flower.webp', audioUrl: '/audio/ingles/flower.mp3' },
        { id: 109, portuguese: 'Árvore', translation: 'Tree', imageUrl: '/images/aula1/tree.webp', audioUrl: '/audio/ingles/tree.mp3' },
        { id: 110, portuguese: 'Janela', translation: 'Window', imageUrl: '/images/aula1/window.webp', audioUrl: '/audio/ingles/window.mp3' },
        { id: 111, portuguese: 'Igreja', translation: 'Church', imageUrl: '/images/aula1/church.webp', audioUrl: '/audio/ingles/church.mp3' },
        { id: 112, portuguese: 'Lua', translation: 'Moon', imageUrl: '/images/aula1/Moon.webp', audioUrl: '/audio/ingles/moon.mp3' }
      ]
    },
    // ...próximas aulas de inglês aqui
  ]
};

// ========================================================================
// --- DADOS EM JAPONÊS (EXEMPLO) ---
// ========================================================================
const japaneseData: LanguageData = {
  homePageModules: {
    main: [ { id: 1, title: "Módulo 01", imageUrl: "https://i.postimg.cc/PrPSWk4S/01-INSTRU-ES.png" } ],
    advanced: [],
  },
  lessons: [
    { 
      id: 1, 
      title: "Aula 01: Começando!", 
      thumbnailUrl: "https://i.postimg.cc/QNw4hkv6/01.png",
      cards: [
        { id: 201, portuguese: 'Sino', translation: '鐘 (Kane)', imageUrl: '/images/aula1/Bell.webp', audioUrl: '/audio/japones/kane.mp3' },
        // Adicione aqui as outras 11 palavras da aula 1 de japonês
      ]
    },
  ]
};

// ========================================================================
// --- DADOS EM COREANO (EXEMPLO) ---
// ========================================================================
const koreanData: LanguageData = {
  homePageModules: {
    main: [ { id: 1, title: "Módulo 01", imageUrl: "https://i.postimg.cc/PrPSWk4S/01-INSTRU-ES.png" } ],
    advanced: [],
  },
  lessons: [
    { 
      id: 1, 
      title: "Aula 01: Começando!", 
      thumbnailUrl: "https://i.postimg.cc/QNw4hkv6/01.png",
      cards: [
        { id: 301, portuguese: 'Sino', translation: '종 (Jong)', imageUrl: '/images/aula1/Bell.webp', audioUrl: '/audio/coreano/jong.mp3' },
        // Adicione aqui as outras 11 palavras da aula 1 de coreano
      ]
    },
  ]
};

// ========================================================================
// --- DADOS EM FRANCÊS (EXEMPLO) ---
// ========================================================================
const frenchData: LanguageData = {
  homePageModules: {
    main: [ { id: 1, title: "Módulo 01", imageUrl: "https://i.postimg.cc/PrPSWk4S/01-INSTRU-ES.png" } ],
    advanced: [],
  },
  lessons: [
    { 
      id: 1, 
      title: "Aula 01: Começando!", 
      thumbnailUrl: "https://i.postimg.cc/QNw4hkv6/01.png",
      cards: [
        { id: 401, portuguese: 'Sino', translation: 'Cloche', imageUrl: '/images/aula1/Bell.webp', audioUrl: '/audio/frances/cloche.mp3' },
        // Adicione aqui as outras 11 palavras da aula 1 de francês
      ]
    },
  ]
};

// ========================================================================
// --- EXPORTAÇÃO PRINCIPAL ---
// ========================================================================
export const allLanguageData: { [key: string]: LanguageData } = {
  en: englishData,
  jp: japaneseData,
  kr: koreanData,
  fr: frenchData,
};

export const languageModules = [
  { id: 1, code: 'en', title: "Inglês", imageUrl: "https://i.postimg.cc/PrPSWk4S/01-INSTRU-ES.png" },
  { id: 2, code: 'jp', title: "Japonês", imageUrl: "https://i.postimg.cc/qBmm678t/02-Grupo-de-Atividades-EXTRA.png" },
  { id: 3, code: 'kr', title: "Coreano", imageUrl: "https://i.postimg.cc/hvGp3FqP/03-Primeiros-Tra-os.png" },
  { id: 4, code: 'fr', title: "Francês", imageUrl: "https://i.postimg.cc/gjB4CMYy/04-Simplifica-o-Geom-trica.png" }
];