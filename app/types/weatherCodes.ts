interface WeatherCode {
  code: number
  description: string
}

export const weatherCodes: WeatherCode[] = [
  { code: 0, description: "Clear sky" },
  { code: 1, description: "Mainly clear" },
  { code: 2, description: "Partly cloudy" },
  { code: 3, description: "Overcast" },
  { code: 45, description: "Fog" },
  { code: 48, description: "Depositing rime fog" },
  { code: 51, description: "Light drizzle" },
  { code: 53, description: "Moderate drizzle" },
  { code: 55, description: "Dense drizzle" },
  { code: 56, description: "Light freezing drizzle" },
  { code: 57, description: "Dense freezing drizzle" },
  { code: 61, description: "Light rain" },
  { code: 63, description: "Moderate rain" },
  { code: 65, description: "Heavy rain" },
  { code: 66, description: "Light freezing rain" },
  { code: 67, description: "Dense freezing rain" },
  { code: 71, description: "Light snow fall" },
  { code: 73, description: "Moderate snow fall" },
  { code: 75, description: "Heavy snow fall" },
  { code: 77, description: "Snow grains" },
  { code: 80, description: "Light rain showers" },
  { code: 81, description: "Moderate rain showers" },
  { code: 82, description: "Heavy rain showers" },
  { code: 85, description: "Light snow showers" },
  { code: 86, description: "Heavy snow showers" },
  { code: 95, description: "Thunderstorm" },
  { code: 96, description: "Thunderstorm with slight hail" },
  { code: 99, description: "Thunderstorm with heavy hail" },
];

export function getWeatherCodeDescription(code: number): string {
  return weatherCodes.find((weatherCode) => weatherCode.code === code)?.description || "Unknown";
}