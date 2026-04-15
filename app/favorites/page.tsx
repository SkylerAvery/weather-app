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
        <p className="text-[var(--muted-color)]">
          Save cities here and show quick forecast snapshots.
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {favorites.map((city) => (
          <li key={city} className="rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{city.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ")}</p>
              </div>
              <Link
                href={`/weather/${city.split(",")[0]}/${city.split(",")[1]}`}
                className="rounded-md border border-[var(--border-color)] px-3 py-2 text-sm hover:border-[var(--accent-color)]"
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
