import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Forecast",
  description: "Weather forecast app with city search and favorites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6">
          <header className="mb-8 border-b border-[var(--border-color)] pb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h1 className="text-2xl font-semibold text-[var(--accent-color)]">Weather Forecast</h1>
              <div className="flex items-center gap-2">
                <nav aria-label="Primary" className="flex gap-2 text-sm">
                  <Link className="rounded-md px-3 py-2 hover:bg-[var(--surface-muted-color)]" href="/">
                    Home
                  </Link>
                  <Link
                    className="rounded-md px-3 py-2 hover:bg-[var(--surface-muted-color)]"
                    href="/favorites"
                  >
                    Favorites
                  </Link>
                </nav>
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
