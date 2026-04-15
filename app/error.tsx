"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-10">
          <section className="space-y-4 rounded-lg border border-red-900/50 bg-red-950/20 p-6">
            <p className="text-sm uppercase tracking-wider text-red-300">
              Application error
            </p>
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="text-slate-300">
              An unexpected API or runtime error occurred.
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
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
