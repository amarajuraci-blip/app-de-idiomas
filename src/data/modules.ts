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

// --- ATUALIZAÇÃO DA INTERFACE ---
interface LanguageData {
  homePageModules: {
    main: { id: number; title: string; imageUrl: string; }[];
    advanced: { id: number; title: string; imageUrl: string; }[];
    listeningPractice: { id: number; title: string; imageUrl: string; }[]; // <-- NOVA SEÇÃO
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
    // --- CONTEÚDO DOS MÓDULOS AVANÇADOS ---
    advanced: [
      { id: 6, title: "Módulo Avançado 1", imageUrl: "https://i.postimg.cc/Y2Ny7W5F/avancado-1.png" },
      { id: 7, title: "Módulo Avançado 2", imageUrl: "https://i.postimg.cc/Y2Ny7W5F/avancado-1.png" },
      { id: 8, title: "Módulo Avançado 3", imageUrl: "https://i.postimg.cc/Y2Ny7W5F/avancado-1.png" },
      { id: 9, title: "Módulo Avançado 4", imageUrl: "https://i.postimg.cc/Y2Ny7W5F/avancado-1.png" },
      { id: 10, title: "Módulo Avançado 5", imageUrl: "https://i.postimg.cc/Y2Ny7W5F/avancado-1.png" },
      { id: 11, title: "Módulo Avançado 6", imageUrl: "https://i.postimg.cc/Y2Ny7W5F/avancado-1.png" }
    ],
    // --- CONTEÚDO DO TREINO DE ESCUTA ---
    listeningPractice: [
        { id: 12, title: "Treino 1", imageUrl: "https://i.postimg.cc/j5G3P3j9/treino-1.png" },
        { id: 13, title: "Treino 2", imageUrl: "https://i.postimg.cc/j5G3P3j9/treino-1.png" },
        { id: 14, title: "Treino 3", imageUrl: "https://i.postimg.cc/j5G3P3j9/treino-1.png" },
        { id: 15, title: "Treino 4", imageUrl: "https://i.postimg.cc/j5G3P3j9/treino-1.png" },
        { id: 16, title: "Treino 5", imageUrl: "https://i.postimg.cc/j5G3P3j9/treino-1.png" },
        { id: 17, title: "Treino 6", imageUrl: "https://i.postimg.cc/j5G3P3j9/treino-1.png" },
        { id: 18, title: "Treino 7", imageUrl: "https://i.postimg.cc/j5G3P3j9/treino-1.png" },
        { id: 19, title: "Treino 8", imageUrl: "https://i.postimg.cc/j5G3P3j9/treino-1.png" },
        { id: 20, title: "Treino 9", imageUrl: "https://i.postimg.cc/j5G3P3j9/treino-1.png" },
        { id: 21, title: "Treino 10", imageUrl: "https://i.postimg.cc/j5G3P3j9/treino-1.png" },
    ]
  },
  lessons: [
    // ... (o conteúdo das lições permanece o mesmo)
    {
      id: 1,
      title: "Aula 01: Primeiros Passos",
      thumbnailUrl: "https://i.postimg.cc/QNw4hkv6/01.png",
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
      thumbnailUrl: "https://i.postimg.cc/tCNk0vjW/aula2-thumb.png",
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
      thumbnailUrl: "https://i.postimg.cc/PqYg4z8T/aula3-thumb.png",
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

const japaneseData: LanguageData = { homePageModules: { ...englishData.homePageModules, advanced: [], listeningPractice: [] }, lessons: [] };
const koreanData: LanguageData = { homePageModules: { ...englishData.homePageModules, advanced: [], listeningPractice: [] }, lessons: [] };
const frenchData: LanguageData = { homePageModules: { ...englishData.homePageModules, advanced: [], listeningPractice: [] }, lessons: [] };

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