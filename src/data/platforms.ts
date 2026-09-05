import type { ImageMetadata } from "astro";
import senamhiVisual from "../../assets/senamhi-overview.png";
import ventuskyVisual from "../../assets/ventusky-cochabamba.jpg";
import nasaVisual from "../../assets/nasa-earthdata-phone.png";
import copernicusVisual from "../../assets/copernicus-overview.png";
import earthVisual from "../../assets/earth-nullschool-overview.png";

export interface ClimatePlatform {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  url: string;
  linkLabel: string;
  scope: string;
  access: string;
  language: string;
  color: string;
  accent: string;
  visual: ImageMetadata;
  visualAlt: string;
  features: Array<{ title: string; text: string }>;
  datasets: string[];
  steps: string[];
  classroom: string;
  note?: string;
  guideUrl?: string;
}

export const platforms: ClimatePlatform[] = [
  {
    slug: "senamhi",
    name: "SENAMHI Bolivia",
    shortName: "SENAMHI",
    tagline: "La referencia oficial para el territorio boliviano",
    summary: "El Servicio Nacional de Meteorología e Hidrología reúne pronósticos, alertas, boletines y monitoreo hidrológico elaborados para las condiciones del país.",
    url: "https://senamhi.gob.bo/",
    linkLabel: "Visitar SENAMHI",
    scope: "Bolivia",
    access: "Público y gratuito",
    language: "Español",
    color: "#00357b",
    accent: "#f0e53c",
    visual: senamhiVisual,
    visualAlt: "Portal principal de SENAMHI Bolivia",
    features: [
      { title: "Pronóstico", text: "Información departamental, diaria, horaria y extendida para estaciones del país." },
      { title: "Alertas", text: "Avisos meteorológicos e hidrológicos con cobertura y período de validez." },
      { title: "Climatología", text: "Monitoreo ENSO, predicción estacional, sequías y boletines climáticos." },
      { title: "Hidrología", text: "Seguimiento de cuencas, balances hídricos y repositorios especializados." },
    ],
    datasets: ["Temperatura", "Precipitación", "Viento", "Humedad", "Niveles de ríos", "Alertas"],
    steps: ["Elegí un departamento", "Seleccioná una estación", "Cambiá entre hoy, diario y extendido", "Contrastá con una alerta vigente"],
    classroom: "Registrá el pronóstico de tu ciudad durante cinco días y comparalo con lo observado. Identificá qué variable presentó la mayor diferencia.",
    guideUrl: "/guias/#senamhi",
  },
  {
    slug: "ventusky",
    name: "Ventusky",
    shortName: "VENTUSKY",
    tagline: "El tiempo como un mapa vivo",
    summary: "Un visor global que transforma modelos numéricos en capas animadas. Es especialmente útil para reconocer patrones de viento, presión, temperatura y precipitación.",
    url: "https://www.ventusky.com/",
    linkLabel: "Abrir Ventusky",
    scope: "Global",
    access: "Gratis + Premium",
    language: "Multilingüe",
    color: "#006dff",
    accent: "#06c6af",
    visual: ventuskyVisual,
    visualAlt: "Mapa de temperatura de Ventusky centrado en Sacaba, Bolivia",
    features: [
      { title: "Capas", text: "Temperatura, sensación térmica, radar, satélite, viento, nubes, presión y aire." },
      { title: "Animación", text: "Una línea temporal permite observar el desplazamiento y evolución de sistemas." },
      { title: "Modelos", text: "Integra fuentes como ECMWF, GFS, ICON y GEM para explorar diferencias." },
      { title: "Detalle local", text: "Al seleccionar un punto aparecen valores y pronósticos para esa coordenada." },
    ],
    datasets: ["Viento", "Ráfagas", "Temperatura", "Presión", "Radar", "CAPE"],
    steps: ["Buscá una ciudad", "Seleccioná una capa", "Mové la línea temporal", "Compará dos modelos disponibles"],
    classroom: "Observá La Paz y Santa Cruz a la misma hora. Explicá cómo altitud y circulación atmosférica ayudan a interpretar sus diferencias.",
    guideUrl: "/guias/#ventusky",
  },
  {
    slug: "nasa-earthdata",
    name: "NASA Earthdata",
    shortName: "NASA",
    tagline: "Datos satelitales para comprender el sistema Tierra",
    summary: "La puerta de acceso al archivo de ciencias de la Tierra de la NASA: datos abiertos, herramientas de búsqueda, visualizadores y recursos de aprendizaje.",
    url: "https://www.earthdata.nasa.gov/",
    linkLabel: "Explorar Earthdata",
    scope: "Global y satelital",
    access: "Datos abiertos",
    language: "Inglés / recursos en español",
    color: "#002b8b",
    accent: "#ff8a34",
    visual: nasaVisual,
    visualAlt: "Ilustración del planeta Tierra utilizada en NASA Earthdata",
    features: [
      { title: "Earthdata Search", text: "Busca, filtra, compara y descarga colecciones científicas por región y fecha." },
      { title: "Worldview", text: "Visualiza imágenes satelitales globales, muchas disponibles casi en tiempo real." },
      { title: "Atmósfera", text: "Acceso a aerosoles, nubes, radiación, precipitación y composición química." },
      { title: "Aprendizaje", text: "Tutoriales, capacitaciones ARSET y recetas para trabajar con datos reales." },
    ],
    datasets: ["Atmósfera", "Océanos", "Superficie", "Criosfera", "Incendios", "Radiación"],
    steps: ["Definí una pregunta", "Elegí tema y variable", "Delimitá Bolivia en el mapa", "Filtrá fecha, sensor y resolución"],
    classroom: "Usá Worldview para identificar humo o nubosidad sobre Bolivia y relacioná la imagen con datos meteorológicos del mismo día.",
  },
  {
    slug: "copernicus",
    name: "Copernicus",
    shortName: "COPERNICUS",
    tagline: "Observación europea con alcance global",
    summary: "El programa de observación de la Tierra de la Unión Europea ofrece información operacional sobre atmósfera, clima, tierra, océanos y emergencias.",
    url: "https://climate.copernicus.eu/",
    linkLabel: "Explorar Copernicus Climate",
    scope: "Global",
    access: "Abierto con registro para descargas",
    language: "Inglés",
    color: "#0035d6",
    accent: "#bfe2fc",
    visual: copernicusVisual,
    visualAlt: "Portal Copernicus con mapa de observación terrestre europeo",
    features: [
      { title: "Clima", text: "Reanálisis, indicadores y proyecciones para estudiar variabilidad y cambio climático." },
      { title: "Atmósfera", text: "CAMS aporta aerosoles, gases, radiación y pronósticos de calidad del aire." },
      { title: "Sentinel", text: "Misiones satelitales que observan superficie, océanos y composición atmosférica." },
      { title: "Datos reproducibles", text: "Metadatos, documentación y APIs orientadas al análisis científico." },
    ],
    datasets: ["ERA5", "CAMS", "Temperatura", "Aerosoles", "Gases traza", "Proyecciones"],
    steps: ["Elegí Climate o Atmosphere", "Buscá una colección", "Revisá unidades y resolución", "Definí área y período"],
    classroom: "Compará una anomalía mensual de temperatura con el promedio climatológico. Explicá por qué una anomalía no es lo mismo que la temperatura diaria.",
    note: "El antiguo portal general copernicus.eu está archivado. Este acceso dirige al servicio climático vigente.",
  },
  {
    slug: "earth-nullschool",
    name: "Earth NullSchool",
    shortName: "EARTH",
    tagline: "La circulación planetaria en una sola mirada",
    summary: "Una visualización global interactiva de condiciones atmosféricas y oceánicas que permite cambiar altura, proyección, fecha y variable.",
    url: "https://earth.nullschool.net/es/",
    linkLabel: "Abrir Earth NullSchool",
    scope: "Global",
    access: "Gratuito",
    language: "Español",
    color: "#001f54",
    accent: "#f8dce8",
    visual: earthVisual,
    visualAlt: "Visualización de corrientes atmosféricas globales de Earth NullSchool",
    features: [
      { title: "Atmósfera", text: "Viento, temperatura, humedad, punto de rocío, presión, CAPE y radiación UV." },
      { title: "Química", text: "Capas de CO, CO₂, SO₂ y NO₂ para explorar composición atmosférica." },
      { title: "Partículas", text: "PM2.5, PM10, polvo y diferentes espesores ópticos de aerosoles." },
      { title: "Altura y tiempo", text: "Cambia niveles de presión y navega por fechas para observar evolución." },
    ],
    datasets: ["Viento", "CO", "CO₂", "SO₂", "NO₂", "PM2.5"],
    steps: ["Abrí el menú Earth", "Elegí Aire, Química o Partículas", "Seleccioná una superposición", "Cambiá altura, fecha y proyección"],
    classroom: "Seguí una corriente en 850 hPa y luego cambiala a superficie. Describí qué permanece y qué cambia en el patrón observado.",
  },
];
