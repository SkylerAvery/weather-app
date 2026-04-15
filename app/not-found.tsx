import Link from "next/link";

export default function NotFound() {
  return (
    <section className="space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm uppercase tracking-wider text-slate-400">404</p>
      <h2 className="text-3xl font-semibold">Page or city not found</h2>
      <p className="max-w-xl text-slate-300">
        The page you requested does not exist, or the city slug is not currently
        supported.
      </p>
      <Link
        href="/"
        className="inline-flex rounded-md bg-sky-500 px-4 py-2 font-medium text-slate-950 hover:bg-sky-400"
      >
        Back to search
      </Link>
    </section>
  );
}
