import { getCityData, getCitySuggestions } from "./citySearch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const countryCode = searchParams.get("countryCode");
  const mode = searchParams.get("mode");
  const query = searchParams.get("q");

  if (mode === "suggestions") {
    const suggestions = await getCitySuggestions(query ?? city ?? "");
    return new Response(JSON.stringify({ suggestions, error: false, reason: null }), { status: 200 });
  }

  if (!city) {
    return new Response(JSON.stringify({ forecast: null, geoData: null, error: false, reason: null }), { status: 404 });
  }

  const cityData = await getCityData(city, countryCode ?? undefined);
  return new Response(JSON.stringify(cityData), { status: cityData.error ? 500 : 200 });
}