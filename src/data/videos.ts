export interface TutorialVideo {
  id: string;
  title: string;
  platform: string;
  description: string;
  duration: string;
  youtubeId: string | null;
}

// Replace each null value with the YouTube video ID to activate its iframe.
export const tutorialVideos: TutorialVideo[] = [
  {
    id: "senamhi",
    title: "Cómo consultar el pronóstico oficial",
    platform: "SENAMHI Bolivia",
    description: "Recorrido por departamentos, estaciones, pronóstico diario, extendido y alertas meteorológicas.",
    duration: "Video pendiente",
    youtubeId: null,
  },
  {
    id: "ventusky",
    title: "Cómo interpretar un mapa dinámico",
    platform: "Ventusky",
    description: "Búsqueda de ciudades, selección de capas, línea temporal y lectura de escalas meteorológicas.",
    duration: "Video pendiente",
    youtubeId: null,
  },
];
