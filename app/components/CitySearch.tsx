"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CitySuggestion } from "@/app/types/citySuggestion";

export default function CitySearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const trimmedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      setSuggestions([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/search?mode=suggestions&q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error("Unable to fetch suggestions.");
        }
        const payload: { suggestions: CitySuggestion[] } = await response.json();
        setSuggestions(payload.suggestions ?? []);
      } catch {
        if (!controller.signal.aborted) {
          setError("Unable to load city suggestions.");
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [trimmedQuery]);

  function navigateToWeather(suggestion: CitySuggestion) {
    router.push(`/weather/${suggestion.name}/${suggestion.country_code}`);
    setSuggestions([]);
  }

  return (
    <form
      className="grid max-w-xl gap-3 rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-4 sm:grid-cols-[1fr_auto]"
      onSubmit={(e) => {
        // User needs to select a city from the suggestions when entering a city name
        e.preventDefault();
      }}
    >
      <label className="sr-only" htmlFor="city">
        City
      </label>
      <div className="relative sm:col-span-2">
        <input
          id="city"
          name="city"
          placeholder="Try: London, Paris, Tokyo"
          className="w-full rounded-md border border-[var(--border-color)] bg-[var(--surface-color)] px-3 py-2 text-[var(--muted-color)] placeholder:text-[var(--muted-color)] focus:border-sky-400 focus:outline-none"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />
        {(loading || error || suggestions.length > 0) && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-[var(--border-color)] bg-[var(--surface-color)] shadow-lg">
            {loading && <p className="px-3 py-2 text-sm text-[var(--muted-color)]">Searching cities...</p>}
            {error && <p className="px-3 py-2 text-sm text-rose-300">{error}</p>}
            {!loading && !error && suggestions.length > 0 && (
              <ul>
                {suggestions.map((suggestion) => (
                  <li key={suggestion.id}>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-sm text-[var(--muted-color)] hover:bg-[var(--surface-muted-color)]"
                      onClick={() =>
                        navigateToWeather(suggestion)
                      }
                    >
                      {suggestion.name}
                      {suggestion.admin1 ? `, ${suggestion.admin1}` : ""}, {suggestion.country}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <button
        className="rounded-md bg-[var(--accent-color)] px-4 py-2 font-medium text-[var(--background)] hover:bg-[var(--accent-color)]/80 sm:col-span-2"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}