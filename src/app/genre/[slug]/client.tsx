"use client";

import { useState } from "react";
import type { Genre } from "@/data/genres";
import { getAllGenres } from "@/data/genres";
import CreateForm from "@/components/CreateForm";
import ResultDisplay from "@/components/ResultDisplay";

interface GenerateResult {
  sunoPrompt: string;
  hook: string;
  verse: string;
  beatRecipe: string;
}

interface SavedResult {
  result: GenerateResult;
  genreName: string;
  color: string;
}

export default function GenrePageClient({ genre }: { genre: Genre }) {
  const [currentResult, setCurrentResult] = useState<SavedResult | null>(null);
  const [compareResult, setCompareResult] = useState<SavedResult | null>(null);
  const [rewriteGenre, setRewriteGenre] = useState<Genre | null>(null);

  function handleResult(result: GenerateResult, genreName: string) {
    if (currentResult) {
      setCompareResult(currentResult);
    }
    setCurrentResult({ result, genreName, color: genre.color });
    setRewriteGenre(null);
  }

  function handleRewriteResult(result: GenerateResult, genreName: string) {
    if (currentResult) {
      setCompareResult(currentResult);
    }
    const g = getAllGenres().find((g) => g.name === genreName);
    setCurrentResult({ result, genreName, color: g?.color ?? genre.color });
    setRewriteGenre(null);
  }

  const otherGenres = getAllGenres().filter((g) => g.slug !== genre.slug);

  return (
    <div className="space-y-6">
      <CreateForm genre={rewriteGenre ?? genre} onResult={rewriteGenre ? handleRewriteResult : handleResult} />

      {currentResult && (
        <div className="space-y-6">
          {compareResult && (
            <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              <div className="rounded-lg border p-3" style={{ borderColor: "var(--border)" }}>
                <ResultDisplay
                  result={compareResult.result}
                  genreName={compareResult.genreName}
                  color={compareResult.color}
                />
              </div>
              <div className="rounded-lg border p-3" style={{ borderColor: "var(--border)" }}>
                <ResultDisplay
                  result={currentResult.result}
                  genreName={currentResult.genreName}
                  color={currentResult.color}
                />
              </div>
            </div>
          )}

          {!compareResult && (
            <ResultDisplay
              result={currentResult.result}
              genreName={currentResult.genreName}
              color={currentResult.color}
            />
          )}

          <div>
            <p className="mb-2 text-xs" style={{ color: "var(--text-secondary)" }}>
              다른 장르로 다시 써줘
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {otherGenres.map((g) => (
                <button
                  key={g.slug}
                  onClick={() => setRewriteGenre(g)}
                  className="shrink-0 rounded-md border px-3 py-2 text-sm transition-colors"
                  style={{
                    borderColor: rewriteGenre?.slug === g.slug ? g.color : "var(--border)",
                    color: rewriteGenre?.slug === g.slug ? g.color : "var(--text-secondary)",
                    backgroundColor:
                      rewriteGenre?.slug === g.slug
                        ? `color-mix(in srgb, ${g.color} 10%, var(--bg))`
                        : "transparent",
                  }}
                >
                  {g.emoji} {g.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
