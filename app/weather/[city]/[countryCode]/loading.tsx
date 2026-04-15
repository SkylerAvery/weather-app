export default function WeatherCityLoading() {
  return (
    <section
      role="status"
      aria-live="polite"
      aria-label="Loading forecast"
      className="rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-4"
    >
      <p>Loading forecast data...</p>
    </section>
  );
}