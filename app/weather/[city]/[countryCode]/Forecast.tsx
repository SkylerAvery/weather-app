import { getWeatherCodeDescription } from "@/app/types/weatherCodes";
import { use } from "react";
import WeatherCityError from "./error";
import NotFound from "@/app/not-found";
import { Forecast as ForecastType } from "@/app/types/forecast";
import { CityGeoCoding } from "@/app/types/geoData";
import SaveToFavoritesButton from "./SaveToFavoritesButton";

export default function Forecast({
  forecastPromise
}: {
  forecastPromise: Promise<{
    forecast: ForecastType | null;
    geoData: CityGeoCoding | null;
    error: boolean;
    reason: string | null;
  }>;
}) {
  const { forecast, geoData, error, reason } = use(forecastPromise);

  if (error) {
    return <WeatherCityError error={new Error(reason || "Unknown error")} reset={() => {}} />;
  }

  if (!forecast?.data || !geoData) {
    return <NotFound />;
  }

  const { current, daily } = forecast.data;
  const { name, country , admin1, country_code} = geoData;

  const unit = forecast.data.daily_units.temperature_2m_max;
  const days = daily.time
    .map((time, index) => ({
      date: time,
      code: daily.weather_code[index],
      max: daily.temperature_2m_max[index],
      min: daily.temperature_2m_min[index],
    }))
    .slice(0, 7);

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
          {name}, {admin1 ? `${admin1}, ` : ""}{country} forecast
        </h2>
        <SaveToFavoritesButton city={name} countryCode={country_code} />
      </div>
      <section aria-label={`${name}, ${admin1 ? `${admin1}, ` : ""}${country} seven day forecast`} className="space-y-4">
        <header className="rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-4 sm:p-5">
          <h3 className="text-xl font-semibold">Current conditions</h3>
          <p className="mt-1 text-sm text-[var(--muted-color)]">
            {getWeatherCodeDescription(current.weather_code)}
          </p>
          <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wide text-[var(--muted-color)]">Temp</dt>
              <dd className="text-lg font-medium">{Math.round(current.temperature_2m)}{forecast.data.current_units.temperature_2m}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-[var(--muted-color)]">Wind</dt>
              <dd className="text-lg font-medium">{Math.round(current.wind_speed_10m)} {forecast.data.current_units.wind_speed_10m}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-[var(--muted-color)]">As of</dt>
              <dd className="text-lg font-medium">{new Date(current.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</dd>
            </div>
          </dl>
        </header>

        <section aria-label="7 day daily forecast">
          <h3 className="mb-3 text-xl font-semibold">7-day outlook</h3>
          <ul className="forecast-scrollbar flex justify-between snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-7 md:overflow-x-visible md:pb-0">
            {days.map((day) => (
              <li key={day.date} className="min-w-[10.5rem] flex-none snap-start sm:min-w-[11.5rem] md:min-w-0">
                <article
                  aria-label={`${new Date(day.date).toLocaleDateString([], {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })} forecast`}
                  className="h-full rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-4"
                >
                  <p className="text-sm font-medium">
                    {new Date(day.date).toLocaleDateString([], {
                      weekday: "short",
                    })}
                  </p>
                  <p className="text-xs text-[var(--muted-color)]">
                    {new Date(day.date).toLocaleDateString([], {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm text-[var(--muted-color)]">
                    {getWeatherCodeDescription(day.code)}
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {Math.round(day.max)}{unit} / {Math.round(day.min)}{unit}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
}