export interface City {
  id: string;
  name: string;
  department: string;
  latitude: number;
  longitude: number;
}

export interface ForecastResponse {
  elevation: number;
  timezone: string;
  current_units: Record<string, string>;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    cloud_cover: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    uv_index_max: number[];
    wind_speed_10m_max: number[];
  };
}

export interface AirQualityResponse {
  current_units: Record<string, string>;
  current: {
    time: string;
    us_aqi: number;
    pm10: number;
    pm2_5: number;
    nitrogen_dioxide: number;
    ozone: number;
  };
}

export interface ClimateData {
  forecast: ForecastResponse;
  airQuality: AirQualityResponse | null;
  fetchedAt: number;
  stale?: boolean;
}

export const CITIES: City[] = [
  { id: "sacaba", name: "Sacaba", department: "Cochabamba", latitude: -17.39799, longitude: -66.03825 },
  { id: "la-paz", name: "La Paz", department: "La Paz", latitude: -16.5, longitude: -68.15 },
  { id: "santa-cruz", name: "Santa Cruz", department: "Santa Cruz", latitude: -17.7833, longitude: -63.1821 },
  { id: "cochabamba", name: "Cochabamba", department: "Cochabamba", latitude: -17.3895, longitude: -66.1568 },
  { id: "sucre", name: "Sucre", department: "Chuquisaca", latitude: -19.0333, longitude: -65.2627 },
  { id: "oruro", name: "Oruro", department: "Oruro", latitude: -17.9833, longitude: -67.15 },
  { id: "tarija", name: "Tarija", department: "Tarija", latitude: -21.5355, longitude: -64.7296 },
  { id: "trinidad", name: "Trinidad", department: "Beni", latitude: -14.8333, longitude: -64.9 },
  { id: "cobija", name: "Cobija", department: "Pando", latitude: -11.0267, longitude: -68.7692 },
  { id: "potosi", name: "Potosí", department: "Potosí", latitude: -19.5836, longitude: -65.7531 },
];

const FORECAST_CURRENT = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "precipitation",
  "weather_code",
  "cloud_cover",
  "surface_pressure",
  "wind_speed_10m",
  "wind_direction_10m",
].join(",");

const FORECAST_DAILY = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "precipitation_probability_max",
  "uv_index_max",
  "wind_speed_10m_max",
].join(",");

const AIR_CURRENT = ["us_aqi", "pm10", "pm2_5", "nitrogen_dioxide", "ozone"].join(",");
const CACHE_TTL = 10 * 60 * 1000;

async function fetchJson(url: URL, timeoutMs = 9000): Promise<unknown> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`La API respondió con estado ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}

function isForecastResponse(value: unknown): value is ForecastResponse {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ForecastResponse>;
  return Boolean(
    candidate.current &&
      typeof candidate.current.temperature_2m === "number" &&
      candidate.daily &&
      Array.isArray(candidate.daily.time) &&
      Array.isArray(candidate.daily.weather_code),
  );
}

function isAirQualityResponse(value: unknown): value is AirQualityResponse {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<AirQualityResponse>;
  return Boolean(candidate.current && typeof candidate.current.us_aqi === "number");
}

function readCache(key: string): ClimateData | null {
  try {
    const cached = localStorage.getItem(key);
    return cached ? (JSON.parse(cached) as ClimateData) : null;
  } catch {
    return null;
  }
}

function writeCache(key: string, data: ClimateData): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Weather remains usable when storage is blocked or full.
  }
}

export async function loadClimateData(city: City, force = false): Promise<ClimateData> {
  const cacheKey = `atmosfera-clima-v1:${city.id}`;
  const cached = readCache(cacheKey);

  if (!force && cached && Date.now() - cached.fetchedAt < CACHE_TTL) return cached;

  const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
  forecastUrl.search = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: FORECAST_CURRENT,
    daily: FORECAST_DAILY,
    timezone: "auto",
    forecast_days: "7",
  }).toString();

  const airUrl = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
  airUrl.search = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: AIR_CURRENT,
    timezone: "auto",
  }).toString();

  try {
    const [forecastResult, airResult] = await Promise.allSettled([
      fetchJson(forecastUrl),
      fetchJson(airUrl),
    ]);

    if (forecastResult.status !== "fulfilled" || !isForecastResponse(forecastResult.value)) {
      throw new Error("No se pudo validar el pronóstico recibido.");
    }

    const data: ClimateData = {
      forecast: forecastResult.value,
      airQuality:
        airResult.status === "fulfilled" && isAirQualityResponse(airResult.value)
          ? airResult.value
          : null,
      fetchedAt: Date.now(),
    };
    writeCache(cacheKey, data);
    return data;
  } catch (error) {
    if (cached) return { ...cached, stale: true };
    throw error;
  }
}

export function weatherInfo(code: number): { label: string; symbol: string } {
  if (code === 0) return { label: "Cielo despejado", symbol: "☀" };
  if ([1, 2].includes(code)) return { label: "Parcialmente nublado", symbol: "◑" };
  if (code === 3) return { label: "Nublado", symbol: "☁" };
  if ([45, 48].includes(code)) return { label: "Niebla", symbol: "≋" };
  if (code >= 51 && code <= 57) return { label: "Llovizna", symbol: "☂" };
  if (code >= 61 && code <= 67) return { label: "Lluvia", symbol: "☂" };
  if (code >= 71 && code <= 77) return { label: "Nieve", symbol: "✣" };
  if (code >= 80 && code <= 82) return { label: "Chubascos", symbol: "☂" };
  if (code >= 85 && code <= 86) return { label: "Nieve intensa", symbol: "✣" };
  if (code >= 95) return { label: "Tormenta", symbol: "ϟ" };
  return { label: "Condición variable", symbol: "○" };
}

export function aqiInfo(value: number): { label: string; tone: string } {
  if (value <= 50) return { label: "Buena", tone: "good" };
  if (value <= 100) return { label: "Moderada", tone: "moderate" };
  if (value <= 150) return { label: "Sensible", tone: "sensitive" };
  return { label: "Deficiente", tone: "poor" };
}
