"use client";

import { useState } from "react";
import type { Genre } from "@/data/genres";

interface GenerateResult {
  sunoPrompt: string;
  hook: string;
  verse: string;
  beatRecipe: string;
}

const MOODS = ["어두운", "몽환적", "공격적", "차분한"] as const;
const ENERGIES = ["low", "mid", "high"] as const;
const STYLES = ["허세형", "내면고백형", "배틀형"] as const;

export default function CreateForm({
  genre,
  onResult,
}: {
  genre: Genre;
  onResult: (result: GenerateResult, genreName: string) => void;
}) {
  const [topic, setTopic] = useState(genre.exampleTopic);
  const [mood, setMood] = useState<string>("몽환적");
  const [energy, setEnergy] = useState<string>("mid");
  const [style, setStyle] = useState<string>("허세형");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: genre.slug, topic, mood, energy, style }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "생성에 실패했습니다");
        return;
      }

      onResult(data, genre.name);
    } catch {
      setError("네트워크 오류. 다시 시도해주세요");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="mb-1 block text-xs" style={{ color: "var(--text-secondary)" }}>
          주제
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          maxLength={200}
          placeholder="예: 새벽 드라이브, 성공 후의 고독..."
          className="w-full rounded-md border px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--accent)]"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs" style={{ color: "var(--text-secondary)" }}>
          무드
        </label>
        <div className="flex gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className="flex-1 rounded-md border px-2 py-2 text-sm transition-colors"
              style={{
                borderColor: mood === m ? genre.color : "var(--border)",
                color: mood === m ? genre.color : "var(--text-secondary)",
                backgroundColor: mood === m ? `color-mix(in srgb, ${genre.color} 10%, var(--bg))` : "var(--bg)",
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs" style={{ color: "var(--text-secondary)" }}>
          에너지
        </label>
        <div className="flex gap-2">
          {ENERGIES.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setEnergy(e)}
              className="flex-1 rounded-md border px-2 py-2 text-sm uppercase transition-colors"
              style={{
                borderColor: energy === e ? genre.color : "var(--border)",
                color: energy === e ? genre.color : "var(--text-secondary)",
                backgroundColor: energy === e ? `color-mix(in srgb, ${genre.color} 10%, var(--bg))` : "var(--bg)",
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs" style={{ color: "var(--text-secondary)" }}>
          스타일
        </label>
        <div className="flex gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className="flex-1 rounded-md border px-2 py-2 text-sm transition-colors"
              style={{
                borderColor: style === s ? genre.color : "var(--border)",
                color: style === s ? genre.color : "var(--text-secondary)",
                backgroundColor: style === s ? `color-mix(in srgb, ${genre.color} 10%, var(--bg))` : "var(--bg)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !topic.trim()}
        className="w-full rounded-lg py-3.5 text-[15px] font-bold text-black transition-opacity disabled:opacity-50"
        style={{ backgroundColor: genre.color }}
      >
        {loading ? (
          <span className="animate-pulse">
            {genre.emoji} {genre.name} 스타일로 만드는 중...
          </span>
        ) : (
          `🎤 ${genre.name} 스타일로 생성하기`
        )}
      </button>

      {error && (
        <p className="rounded-md p-2 text-center text-sm" style={{ color: "var(--error)" }}>
          {error}
        </p>
      )}
    </form>
  );
}
