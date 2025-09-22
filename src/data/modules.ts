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
    advanced: [],
  },
  lessons: [
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
      title: "Aula 02: Transportes e a Cidade",
      thumbnailUrl: "https://i.postimg.cc/tCNk0vjW/aula2-thumb.png", // SUBSTITUA PELA SUA THUMBNAIL
      cards: [
        { id: 113, portuguese: 'Carro', translation: 'Car', imageUrl: '/images/aula2/car.webp', audioUrl: '/audio/ingles/aula2/car.mp3' },
        { id: 114, portuguese: 'Ônibus', translation: 'Bus', imageUrl: '/images/aula2/bus.webp', audioUrl: '/audio/ingles/aula2/bus.mp3' },
        { id: 115, portuguese: 'Trem', translation: 'Train', imageUrl: '/images/aula2/train.webp', audioUrl: '/audio/ingles/aula2/train.mp3' },
        { id: 116, portuguese: 'Avião', translation: 'Airplane', imageUrl: '/images/aula2/airplane.webp', audioUrl: '/audio/ingles/aula2/airplane.mp3' },
        { id: 117, portuguese: 'Barco', translation: 'Boat', imageUrl: '/images/aula2/boat.webp', audioUrl: '/audio/ingles/aula2/boat.mp3' },
        { id: 118, portuguese: 'Rua', translation: 'Street', imageUrl: '/images/aula2/street.webp', audioUrl: '/audio/ingles/aula2/street.mp3' },
        { id: 119, portuguese: 'Cidade', translation: 'City', imageUrl: '/images/aula2/city.webp', audioUrl: '/audio/ingles/aula2/city.mp3' },
        { id: 120, portuguese: 'Prédio', translation: 'Building', imageUrl: '/images/aula2/building.webp', audioUrl: '/audio/ingles/aula2/building.mp3' },
        { id: 121, portuguese: 'Ponte', translation: 'Bridge', imageUrl: '/images/aula2/bridge.webp', audioUrl: '/audio/ingles/aula2/bridge.mp3' },
        { id: 122, portuguese: 'Semáforo', translation: 'Traffic Light', imageUrl: '/images/aula2/traffic-light.webp', audioUrl: '/audio/ingles/aula2/traffic-light.mp3' },
        { id: 123, portuguese: 'Placa', translation: 'Sign', imageUrl: '/images/aula2/sign.webp', audioUrl: '/audio/ingles/aula2/sign.mp3' },
        { id: 124, portuguese: 'Mapa', translation: 'Map', imageUrl: '/images/aula2/map.webp', audioUrl: '/audio/ingles/aula2/map.mp3' }
      ]
    },
    {
      id: 3,
      title: "Aula 03: Comidas e Animais",
      thumbnailUrl: "https://i.postimg.cc/PqYg4z8T/aula3-thumb.png", // SUBSTITUA PELA SUA THUMBNAIL
      cards: [
        { id: 125, portuguese: 'Maçã', translation: 'Apple', imageUrl: '/images/aula3/apple.webp', audioUrl: '/audio/ingles/aula3/apple.mp3' },
        { id: 126, portuguese: 'Banana', translation: 'Banana', imageUrl: '/images/aula3/banana.webp', audioUrl: '/audio/ingles/aula3/banana.mp3' },
        { id: 127, portuguese: 'Pão', translation: 'Bread', imageUrl: '/images/aula3/bread.webp', audioUrl: '/audio/ingles/aula3/bread.mp3' },
        { id: 128, portuguese: 'Leite', translation: 'Milk', imageUrl: '/images/aula3/milk.webp', audioUrl: '/audio/ingles/aula3/milk.mp3' },
        { id: 129, portuguese: 'Água', translation: 'Water', imageUrl: '/images/aula3/water.webp', audioUrl: '/audio/ingles/aula3/water.mp3' },
        { id: 130, portuguese: 'Queijo', translation: 'Cheese', imageUrl: '/images/aula3/cheese.webp', audioUrl: '/audio/ingles/aula3/cheese.mp3' },
        { id: 131, portuguese: 'Gato', translation: 'Cat', imageUrl: '/images/aula3/cat.webp', audioUrl: '/audio/ingles/aula3/cat.mp3' },
        { id: 132, portuguese: 'Cavalo', translation: 'Horse', imageUrl: '/images/aula3/horse.webp', audioUrl: '/audio/ingles/aula3/horse.mp3' },
        { id: 133, portuguese: 'Pássaro', translation: 'Bird', imageUrl: '/images/aula3/bird.webp', audioUrl: '/audio/ingles/aula3/bird.mp3' },
        { id: 134, portuguese: 'Peixe', translation: 'Fish', imageUrl: '/images/aula3/fish.webp', audioUrl: '/audio/ingles/aula3/fish.mp3' },
        { id: 135, portuguese: 'Vaca', translation: 'Cow', imageUrl: '/images/aula3/cow.webp', audioUrl: '/audio/ingles/aula3/cow.mp3' },
        { id: 136, portuguese: 'Ovelha', translation: 'Sheep', imageUrl: '/images/aula3/sheep.webp', audioUrl: '/audio/ingles/aula3/sheep.mp3' }
      ]
    },
  ]
};

// ========================================================================
// --- DADOS EM OUTROS IDIOMAS (Estrutura pronta para ser preenchida) ---
// ========================================================================
const japaneseData: LanguageData = { homePageModules: englishData.homePageModules, lessons: [] };
const koreanData: LanguageData = { homePageModules: englishData.homePageModules, lessons: [] };
const frenchData: LanguageData = { homePageModules: englishData.homePageModules, lessons: [] };

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

