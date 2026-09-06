export interface TutorialVideo {
  id: string;
  title: string;
  platform: string;
  description: string;
  duration: string;
  youtubeId: string | null;
}

export const tutorialVideos: TutorialVideo[] = [
  {
    id: "senamhi",
    title: "Guía de uso de página SENAMHI Bolivia UA SACABA 5° año",
    platform: "YouTube",
    description: "",
    duration: "",
    youtubeId: "0f1yuEv-DRQ",
  },
  {
    id: "ventusky",
    title: "Guía de uso página Ventusky",
    platform: "YouTube",
    description: "",
    duration: "",
    youtubeId: "Qq7Yh6J_q6g",
  },
  {
    id: "nasa-earth-data",
    title: "Guía de uso página NASA Earth Data",
    platform: "YouTube",
    description: "",
    duration: "",
    youtubeId: "r29sAoQECdE",
  },
  {
    id: "copernicus",
    title: "Guía de uso página Copernicus",
    platform: "YouTube",
    description: "",
    duration: "",
    youtubeId: "ozXS9_pQMq4",
  },
  {
    id: "earth-nullschool",
    title: "Guía de uso página Earth Nullschool",
    platform: "YouTube",
    description: "",
    duration: "",
    youtubeId: "HWHfBQhnL5M",
  },
];
