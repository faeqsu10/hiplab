import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HipLab — 힙합 장르 실험실",
  description: "힙합 장르를 배우고, 직접 만들어보세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        <main className="mx-auto max-w-2xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
