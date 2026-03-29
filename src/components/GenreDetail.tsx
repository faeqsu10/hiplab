import type { Genre } from "@/data/genres";

export default function GenreDetail({ genre }: { genre: Genre }) {
  return (
    <div className="space-y-3">
      <div
        className="rounded-lg border p-3"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      >
        <h3
          className="mb-1.5 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          왜 이런 소리일까?
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#ccc" }}>
          {genre.whyItSounds}
        </p>
      </div>

      <div
        className="rounded-lg border p-3"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      >
        <h3
          className="mb-1.5 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          핵심 요소
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#ccc" }}>
          🥁 드럼: {genre.elements.drums}
          <br />
          🎸 베이스: {genre.elements.bass}
          <br />
          🎹 멜로디: {genre.elements.melody}
          <br />
          🎤 플로우: {genre.elements.flow}
        </p>
      </div>

      <div
        className="rounded-lg border p-3"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      >
        <h3
          className="mb-1.5 text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          대표곡
        </h3>
        {genre.representativeSongs.map((song) => (
          <div
            key={`${song.artist}-${song.title}`}
            className="flex items-center justify-between border-b py-1.5 text-sm last:border-b-0"
            style={{ borderColor: "var(--bg)" }}
          >
            <span>
              {song.artist} — {song.title}
            </span>
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {song.year}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
