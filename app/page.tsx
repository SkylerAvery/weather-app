import CitySearch from "./components/CitySearch";

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold">Search forecasts by city</h2>
        <p className="max-w-xl text-[var(--muted-color)] ">
          Use this homepage as the main search experience. API integration can
          later submit this form and redirect to the dynamic city route.
        </p>
      </div>

      <CitySearch />
      {/* Splitting this into a client component due to user interaction with city suggestions and the useEffect hook */}
      {/* The rest of this page is server component as it's not interactive */}
    </section>
  );
}
