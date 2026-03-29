"use client";

import { useState } from "react";

interface Result {
  sunoPrompt: string;
  hook: string;
  verse: string;
  beatRecipe: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded border px-2 py-0.5 text-[11px] transition-colors"
      style={{
        borderColor: "var(--border)",
        color: copied ? "var(--accent)" : "var(--text-secondary)",
      }}
    >
      {copied ? "복사됨!" : "복사"}
    </button>
  );
}

function ResultCard({
  title,
  content,
  color,
  showCopy,
  mono,
}: {
  title: string;
  content: string;
  color: string;
  showCopy?: boolean;
  mono?: boolean;
}) {
  return (
    <div
      className="rounded-lg border p-3"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      <div className="mb-2 flex items-center justify-between">
        <h4
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color }}
        >
          {title}
        </h4>
        {showCopy && <CopyButton text={content} />}
      </div>
      <pre
        className={`whitespace-pre-wrap text-sm leading-relaxed ${mono ? "font-mono" : ""}`}
        style={{ color: "#ccc", fontFamily: mono ? undefined : "inherit" }}
      >
        {content}
      </pre>
    </div>
  );
}

export default function ResultDisplay({
  result,
  genreName,
  color,
}: {
  result: Result;
  genreName: string;
  color: string;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
        {genreName} 생성 결과
      </h3>
      <ResultCard
        title="Suno/Udio 프롬프트"
        content={result.sunoPrompt}
        color={color}
        showCopy
        mono
      />
      <ResultCard title="8마디 훅" content={result.hook} color={color} />
      <ResultCard title="16마디 버스" content={result.verse} color={color} />
      <ResultCard
        title="비트 레시피"
        content={result.beatRecipe}
        color={color}
        mono
      />
    </div>
  );
}
