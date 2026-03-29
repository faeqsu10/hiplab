import { getAllGenres } from "@/data/genres";
import GenreCard from "@/components/GenreCard";

export default function Home() {
  const genres = getAllGenres();

  return (
    <div>
      <header className="py-6 text-center">
        <h1 className="text-3xl font-black tracking-tight">
          Hip<span style={{ color: "var(--accent)" }}>Lab</span>
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          힙합 장르를 배우고, 직접 만들어보세요
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {genres.map((genre) => (
          <GenreCard key={genre.slug} genre={genre} />
        ))}
      </div>
    </div>
  );
}
