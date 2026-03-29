import Link from "next/link";
import type { Genre } from "@/data/genres";

export default function GenreCard({ genre }: { genre: Genre }) {
  return (
    <Link
      href={`/genre/${genre.slug}`}
      className="block rounded-lg border p-4 transition-colors hover:border-[var(--accent)]"
      style={{
        borderColor: genre.color,
        backgroundColor: "var(--surface)",
      }}
    >
      <div className="text-2xl">{genre.emoji}</div>
      <h3 className="mt-1 text-[15px] font-bold">{genre.name}</h3>
      <p className="mt-0.5 text-[11px]" style={{ color: "var(--text-secondary)" }}>
        {genre.bpmRange[0]}–{genre.bpmRange[1]} BPM
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {genre.elements.drums.split(" + ").slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded px-1.5 py-0.5 text-[10px]"
            style={{
              backgroundColor: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {tag.trim()}
          </span>
        ))}
      </div>
    </Link>
  );
}
