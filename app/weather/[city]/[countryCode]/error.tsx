"use client";

type WeatherCityErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function WeatherCityError({
  error,
  reset,
}: WeatherCityErrorProps) {
  return (
    <section className="space-y-4 rounded-lg border border-red-900/50 bg-red-950/20 p-6">
      <p className="text-sm uppercase tracking-wider text-red-300">Forecast error</p>
      <h2 className="text-2xl font-semibold">Could not load city forecast</h2>
      <p className="text-slate-300">
        A weather API request failed. Try again or switch to another city while
        external integrations are being configured.
      </p>
      {error.message ? (
        <p className="rounded bg-slate-950 p-3 text-sm text-slate-300">
          Details: {error.message}
        </p>
      ) : null}
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-red-300 px-4 py-2 font-medium text-red-950 hover:bg-red-200"
      >
        Retry
      </button>
    </section>
  );
}
