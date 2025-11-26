interface Card {
  id: number;
  portuguese: string;
  translation: string;
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
    listeningPractice: { id: number; title: string; imageUrl: string; }[];
    readingAndWriting: { id: number; title: string; imageUrl: string; }[];
  };
  lessons: Lesson[];
}

const englishData: LanguageData = {
  homePageModules: {
    main: [
      { id: 1, title: "Módulo 01", imageUrl: "/images/visual/m1_01.webp" },
      { id: 2, title: "Módulo 02", imageUrl: "/images/visual/m1_02.webp" },
      { id: 3, title: "Módulo 03", imageUrl: "/images/visual/m1_03.webp" },
      { id: 4, title: "Módulo 04", imageUrl: "/images/visual/m1_04.webp" },
      { id: 5, title: "Módulo 05", imageUrl: "/images/visual/m1_05.webp" }
    ],
    advanced: [
      { id: 6, title: "Módulo Avançado 1", imageUrl: "/images/visual/m2_01.webp" },
      { id: 7, title: "Módulo Avançado 2", imageUrl: "/images/visual/m2_02.webp" },
      { id: 8, title: "Módulo Avançado 3", imageUrl: "/images/visual/m2_03.webp" },
      { id: 9, title: "Módulo Avançado 4", imageUrl: "/images/visual/m2_04.webp" },
      { id: 10, title: "Módulo Avançado 5", imageUrl: "/images/visual/m2_05.webp" },
      { id: 11, title: "Módulo Avançado 6", imageUrl: "/images/visual/m2_06.webp" },
      { id: 12, title: "Módulo Avançado 7", imageUrl: "/images/visual/m2_07.webp" },
      { id: 13, title: "Módulo Avançado 8", imageUrl: "/images/visual/m2_08.webp" },
      { id: 14, title: "Módulo Avançado 9", imageUrl: "/images/visual/m2_09.webp" },
      { id: 15, title: "Módulo Avançado 10", imageUrl: "/images/visual/m2_10.webp" },
    ],
    listeningPractice: [
        // Reduzido para 6 módulos conforme solicitado
        { id: 16, title: "Treino 1", imageUrl: "/images/visual/m3_01.webp" },
        { id: 17, title: "Treino 2", imageUrl: "/images/visual/m3_02.webp" },
        { id: 18, title: "Treino 3", imageUrl: "/images/visual/m3_03.webp" },
        { id: 19, title: "Treino 4", imageUrl: "/images/visual/m3_04.webp" },
        { id: 20, title: "Treino 5", imageUrl: "/images/visual/m3_05.webp" },
        { id: 21, title: "Treino 6", imageUrl: "/images/visual/m3_06.webp" },
    ],
    readingAndWriting: [
      { id: 26, title: "Leitura 1", imageUrl: "/images/visual/m4_01.webp" },
      { id: 27, title: "Leitura 2", imageUrl: "/images/visual/m4_02.webp" },
      { id: 28, title: "Leitura 3", imageUrl: "/images/visual/m4_03.webp" },
      { id: 29, title: "Leitura 4", imageUrl: "/images/visual/m4_04.webp" },
      { id: 30, title: "Leitura 5", imageUrl: "/images/visual/m4_05.webp" },
    ]
  },
  lessons: [
    {
      id: 1,
      title: "Aula 01: Primeiros Passos",
      thumbnailUrl: "/images/visual/Thumbnail1.webp",
      cards: [
        { id: 101, portuguese: 'Sino', translation: 'Bell', imageUrl: '/images/aula1/Bell.webp', audioUrl: '/audio/ingles/aula1/bell.mp3' },
        { id: 102, portuguese: 'Bicicleta', translation: 'Bicycle', imageUrl: '/images/aula1/bicycle.webp', audioUrl: '/audio/ingles/aula1/bicycle.mp3' },
        { id: 103, portuguese: 'Casa', translation: 'House', imageUrl: '/images/aula1/House.webp', audioUrl: '/audio/ingles/aula1/house.mp3' },
        { id: 104, portuguese: 'Cachorro', translation: 'Dog', imageUrl: '/images/aula1/dog.webp', audioUrl: '/audio/ingles/aula1/dog.mp3' },
        { id: 105, portuguese: 'Praia', translation: 'Beach', imageUrl: '/images/aula1/beach.webp', audioUrl: '/audio/ingles/aula1/beach.mp3' },
        { id: 106, portuguese: 'Estrela', translation: 'Star', imageUrl: '/images/aula1/star.webp', audioUrl: '/audio/ingles/aula1/star.mp3' },
        { id: 107, portuguese: 'Porta', translation: 'Door', imageUrl: '/images/aula1/door.webp', audioUrl: '/audio/ingles/aula1/door.mp3' },
        { id: 108, portuguese: 'Flor', translation: 'Flower', imageUrl: '/images/aula1/Flower.webp', audioUrl: '/audio/ingles/aula1/flower.mp3' },
        { id: 109, portuguese: 'Árvore', translation: 'Tree', imageUrl: '/images/aula1/tree.webp', audioUrl: '/audio/ingles/aula1/tree.mp3' },
        { id: 110, portuguese: 'Janela', translation: 'Window', imageUrl: '/images/aula1/window.webp', audioUrl: '/audio/ingles/aula1/window.mp3' },
        { id: 111, portuguese: 'Igreja', translation: 'Church', imageUrl: '/images/aula1/church.webp', audioUrl: '/audio/ingles/aula1/church.mp3' },
        { id: 112, portuguese: 'Lua', translation: 'Moon', imageUrl: '/images/aula1/Moon.webp', audioUrl: '/audio/ingles/aula1/moon.mp3' }
      ]
    },
    {
      id: 2,
      title: "Aula 02: Animais da Quinta",
      thumbnailUrl: "/images/visual/Thumbnail2.webp",
      cards: [
        { id: 113, portuguese: 'Periquito', translation: 'Budgie', imageUrl: '/images/aula2/budgie.webp', audioUrl: '/audio/ingles/aula2/budgie.mp3' },
        { id: 114, portuguese: 'Touro', translation: 'Bull', imageUrl: '/images/aula2/bull.webp', audioUrl: '/audio/ingles/aula2/bull.mp3' },
        { id: 115, portuguese: 'Gato', translation: 'Cat', imageUrl: '/images/aula2/cat.webp', audioUrl: '/audio/ingles/aula2/cat.mp3' },
        { id: 116, portuguese: 'Galinha', translation: 'Chicken', imageUrl: '/images/aula2/chicken.webp', audioUrl: '/audio/ingles/aula2/chicken.mp3' },
        { id: 117, portuguese: 'Vaca', translation: 'Cow', imageUrl: '/images/aula2/cow.webp', audioUrl: '/audio/ingles/aula2/cow.mp3' },
        { id: 118, portuguese: 'Pato', translation: 'Duck', imageUrl: '/images/aula2/duck.webp', audioUrl: '/audio/ingles/aula2/duck.mp3' },
        { id: 119, portuguese: 'Peixe', translation: 'Fish', imageUrl: '/images/aula2/fish.webp', audioUrl: '/audio/ingles/aula2/fish.mp3' },
        { id: 120, portuguese: 'Cabra', translation: 'Goat', imageUrl: '/images/aula2/goat.webp', audioUrl: '/audio/ingles/aula2/goat.mp3' },
        { id: 121, portuguese: 'Cavalo', translation: 'Horse', imageUrl: '/images/aula2/horse.webp', audioUrl: '/audio/ingles/aula2/horse.mp3' },
        { id: 122, portuguese: 'Porco', translation: 'Pig', imageUrl: '/images/aula2/pig.webp', audioUrl: '/audio/ingles/aula2/pig.mp3' },
        { id: 123, portuguese: 'Coelho', translation: 'Rabbit', imageUrl: '/images/aula2/rabbit.webp', audioUrl: '/audio/ingles/aula2/rabbit.mp3' },
        { id: 124, portuguese: 'Ovelha', translation: 'Sheep', imageUrl: '/images/aula2/sheep.webp', audioUrl: '/audio/ingles/aula2/sheep.mp3' }
      ]
    },
    {
      id: 3,
      title: "Aula 03: Frutas",
      thumbnailUrl: "/images/visual/Thumbnail3.webp",
      cards: [
        { id: 125, portuguese: 'Maçã', translation: 'Apple', imageUrl: '/images/aula3/apple.webp', audioUrl: '/audio/ingles/aula3/apple.mp3' },
        { id: 126, portuguese: 'Abacate', translation: 'Avocado', imageUrl: '/images/aula3/avocado.webp', audioUrl: '/audio/ingles/aula3/avocado.mp3' },
        { id: 127, portuguese: 'Coco', translation: 'Coconut', imageUrl: '/images/aula3/coconut.webp', audioUrl: '/audio/ingles/aula3/coconut.mp3' },
        { id: 128, portuguese: 'Uva', translation: 'Grape', imageUrl: '/images/aula3/grape.webp', audioUrl: '/audio/ingles/aula3/grape.mp3' },
        { id: 129, portuguese: 'Jaca', translation: 'Jackfruit', imageUrl: '/images/aula3/jackfruit.webp', audioUrl: '/audio/ingles/aula3/jackfruit.mp3' },
        { id: 130, portuguese: 'Laranja', translation: 'Orange', imageUrl: '/images/aula3/orange.webp', audioUrl: '/audio/ingles/aula3/orange.mp3' },
        { id: 131, portuguese: 'Abacaxi', translation: 'Pineapple', imageUrl: '/images/aula3/pineapple.webp', audioUrl: '/audio/ingles/aula3/pineapple.mp3' },
        { id: 132, portuguese: 'Ameixa', translation: 'Plum', imageUrl: '/images/aula3/plum.webp', audioUrl: '/audio/ingles/aula3/plum.mp3' },
        { id: 133, portuguese: 'Graviola', translation: 'Soursop', imageUrl: '/images/aula3/soursop.webp', audioUrl: '/audio/ingles/aula3/soursop.mp3' },
        { id: 134, portuguese: 'Carambola', translation: 'Starfruit', imageUrl: '/images/aula3/starfruit.webp', audioUrl: '/audio/ingles/aula3/starfruit.mp3' },
        { id: 135, portuguese: 'Morango', translation: 'Strawberry', imageUrl: '/images/aula3/strawberry.webp', audioUrl: '/audio/ingles/aula3/strawberry.mp3' },
        { id: 136, portuguese: 'Melancia', translation: 'Watermelon', imageUrl: '/images/aula3/watermelon.webp', audioUrl: '/audio/ingles/aula3/watermelon.mp3' }
      ]
    },
  ]
};

const japaneseData: LanguageData = { homePageModules: { ...englishData.homePageModules, advanced: [], listeningPractice: [], readingAndWriting: [] }, lessons: [] };
const koreanData: LanguageData = { homePageModules: { ...englishData.homePageModules, advanced: [], listeningPractice: [], readingAndWriting: [] }, lessons: [] };
const frenchData: LanguageData = { homePageModules: { ...englishData.homePageModules, advanced: [], listeningPractice: [], readingAndWriting: [] }, lessons: [] };

export const allLanguageData: { [key: string]: LanguageData } = {
  en: englishData,
  jp: japaneseData,
  kr: koreanData,
  fr: frenchData,
};

export const languageModules = [
  { id: 1, code: 'en', title: "Inglês", imageUrl: "/images/visual/eng.webp" },
  { id: 2, code: 'jp', title: "Japonês", imageUrl: "/images/visual/jpa.webp" },
  { id: 3, code: 'kr', title: "Coreano", imageUrl: "/images/visual/cor.webp" },
  { id: 4, code: 'fr', title: "Francês", imageUrl: "/images/visual/fra.webp" },
  { id: 5, code: 'es', title: "Espanhol", imageUrl: "/images/visual/esp.webp" },
  { id: 6, code: 'de', title: "Alemão", imageUrl: "/images/visual/ger.webp" },
  { id: 7, code: 'it', title: "Italiano", imageUrl: "/images/visual/ita.webp" },
  { id: 8, code: 'ru', title: "Russo", imageUrl: "/images/visual/rus.webp" },
  { id: 9, code: 'zh', title: "Mandarim", imageUrl: "/images/visual/chi.webp" },
  { id: 10, code: 'tr', title: "Turco", imageUrl: "/images/visual/tur.webp" }
];
