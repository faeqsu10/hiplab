import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-black tracking-tight">
        Hip<span style={{ color: "var(--accent)" }}>Lab</span>
      </h1>
      <p className="mt-4 text-lg" style={{ color: "var(--text-secondary)" }}>
        이 장르는 아직 없어요
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
        style={{ backgroundColor: "var(--accent)", color: "black" }}
      >
        전체 장르 보기
      </Link>
    </div>
  );
}
