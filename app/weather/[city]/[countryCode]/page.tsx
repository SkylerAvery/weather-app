import { Suspense } from "react";
import Forecast from "./Forecast";
import WeatherCityLoading from "./loading";
import { CityGeoCoding } from "@/app/types/geoData";
import { Forecast as ForecastType } from "@/app/types/forecast";
import { getCityData } from "@/app/api/search/citySearch";

type WeatherPageProps = {
  params: Promise<{ city: string; countryCode: string }>;
};

type ForecastPromise = Promise<{ forecast: ForecastType | null; geoData: CityGeoCoding | null; error: boolean; reason: string | null; }>;

export default async function WeatherCityPage({ params }: WeatherPageProps) {
  const { city, countryCode } = await params;

  const forecastPromise: ForecastPromise = getCityData(city, countryCode);

  return (
    <section className="space-y-5">
      <Suspense fallback={<WeatherCityLoading />}>
        <Forecast forecastPromise={forecastPromise} />
      </Suspense>
    </section>
  );
}
