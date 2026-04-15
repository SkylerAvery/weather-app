"use client";

import { useEffect, useState } from "react";

export default function SaveToFavoritesButton({ city, countryCode }: { city: string, countryCode: string }) {
  const [isSaved, setIsSaved] = useState(false);

  function handleSaveToFavorites(save: boolean) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      let favorites: string[] = [];
      if (stored) {
        favorites = JSON.parse(stored);
        if (save) {
          favorites.push(`${city},${countryCode}`);
        } else {
          favorites = favorites.filter((favorite: string) => favorite !== `${city},${countryCode}`);
        }
      } else {
        if (save) {
          favorites.push(`${city},${countryCode}`);
        }
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsSaved(save);
    }
  }

  useEffect(() => {
    setIsSaved(localStorage.getItem("favorites")?.includes(`${city},${countryCode}`) || false);
  }, [city, countryCode]);

  return (
    <div className="flex gap-2">
      <button className="rounded-md border border-slate-700 px-3 py-2 text-sm hover:border-sky-400" onClick={() => handleSaveToFavorites(true)}>
        {isSaved ? "Saved to favorites" : "Save to favorites"}
      </button>
      {isSaved && (
        <button className="rounded-md border border-slate-700 px-3 py-2 text-sm hover:border-sky-400" onClick={() => handleSaveToFavorites(false)}>Remove from favorites</button>
      )}
    </div>
  )
}