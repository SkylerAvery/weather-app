import CitySearch from "./components/CitySearch";

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold">Search forecasts by city</h2>
        <p className="max-w-xl text-slate-300">
          Use this homepage as the main search experience. API integration can
          later submit this form and redirect to the dynamic city route.
        </p>
      </div>

      <CitySearch />
    </section>
  );
}
