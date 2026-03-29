import { notFound } from "next/navigation";
import { getGenreBySlug, getAllGenres } from "@/data/genres";
import GenreDetail from "@/components/GenreDetail";
import GenrePageClient from "./client";

export function generateStaticParams() {
  return getAllGenres().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const genre = getGenreBySlug(slug);
  if (!genre) return { title: "Not Found" };
  return {
    title: `${genre.name} — HipLab`,
    description: genre.whyItSounds,
  };
}

export default async function GenrePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const genre = getGenreBySlug(slug);
  if (!genre) notFound();

  return (
    <div>
      <a
        href="/"
        className="mb-4 inline-block text-sm transition-colors hover:underline"
        style={{ color: "var(--text-secondary)" }}
      >
        ← 전체 장르
      </a>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl">{genre.emoji}</span>
        <div>
          <h1 className="text-2xl font-extrabold">{genre.name}</h1>
          <span
            className="rounded-md px-2 py-0.5 text-xs"
            style={{
              backgroundColor: `color-mix(in srgb, ${genre.color} 15%, var(--bg))`,
              color: genre.color,
            }}
          >
            {genre.bpmRange[0]}–{genre.bpmRange[1]} BPM
          </span>
        </div>
      </div>

      <GenreDetail genre={genre} />

      <hr className="my-6" style={{ borderColor: "var(--border)" }} />

      <GenrePageClient genre={genre} />
    </div>
  );
}
