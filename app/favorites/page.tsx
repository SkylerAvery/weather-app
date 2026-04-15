"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    }
  }, []);

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-3xl font-semibold">Favorite cities</h2>
        <p className="text-slate-300">
          Save cities here and show quick forecast snapshots.
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {favorites.map((city) => (
          <li key={city} className="rounded-lg border border-slate-800 bg-slate-900 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{city.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")}</p>
              </div>
              <Link
                href={`/weather/${city}`}
                className="rounded-md border border-slate-700 px-3 py-2 text-sm hover:border-sky-400"
              >
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
