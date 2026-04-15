import { CityGeoCoding } from "@/app/types/geoData";
import { Forecast } from "@/app/types/forecast";
import { CitySuggestion } from "@/app/types/citySuggestion";

export async function getCityGeocoding(city: string, count: number = 1, countryCode?: string) {
  const geo = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}${countryCode ? `&countryCode=${countryCode}` : ""}&count=${count}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["geocoding", `${city}, ${countryCode ?? ""}`],
      },
    },
  );
  const { results }: { results?: CityGeoCoding[] } = await geo.json();
  return results ?? [];
}

async function getForecast(latitude: number, longitude: number): Promise<Forecast> {
  const weather = await fetch(
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}&longitude=${longitude}` +
    `&forecast_days=7` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&current=temperature_2m,weather_code,wind_speed_10m` +
    `&timezone=auto`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
        tags: ["forecast", `${latitude},${longitude}`],
      },
    }
  );
  const response = await weather.json();

  if (response.error) {
    return { data: null, error: true, reason: response.reason };
  }
  return { data: response, error: false, reason: null };
}

export async function getCitySuggestions(query: string, count: number = 5): Promise<CitySuggestion[]> {
  if (!query.trim()) {
    return [];
  }

  const results = await getCityGeocoding(query, count);
  return results.map((result) => ({
    id: result.id,
    name: result.name,
    country: result.country,
    country_code: result.country_code,
    admin1: result.admin1,
    latitude: result.latitude,
    longitude: result.longitude,
  }));
}

export async function getCityData(city: string, countryCode?: string) {
  if (!city) {
    return { forecast: null, geoData: null, error: false, reason: null };
  }

  const geoData = await getCityGeocoding(city, 1, countryCode);
  if (geoData.length === 0) {
    return { forecast: null, geoData: null, error: false, reason: null };
  }
  const forecast = await getForecast(geoData[0].latitude, geoData[0].longitude);
  return { forecast, geoData: geoData[0] ?? null, error: forecast?.error ?? false, reason: forecast?.reason ?? null };
}