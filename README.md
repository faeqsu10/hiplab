# HipLab

힙합 장르를 배우고, 직접 만들어보는 장르 실험실.

6개 힙합 장르(Trap, Boom Bap, Drill, Lo-fi, Rage, G-Funk)의 특징을 알려주고, AI로 가사와 Suno/Udio용 프롬프트를 생성합니다. 같은 주제를 다른 장르로 변환하면서 장르 간 차이를 체감할 수 있습니다.

## 주요 기능

- **장르 탐색**: "왜 이런 소리일까?" 설명 + 핵심 요소(드럼/베이스/멜로디/플로우) + 대표곡
- **AI 생성**: 주제/무드/에너지/스타일을 선택하면 Suno 프롬프트 + 8마디 훅 + 16마디 버스 + 비트 레시피 생성
- **장르 변환**: "다른 장르로 다시 써줘" 버튼으로 같은 주제를 다른 장르로 재생성 + 비교

## 기술 스택

- Next.js 14 (App Router)
- Tailwind CSS
- Gemini API
- Vercel

## 로컬 실행

```bash
npm install
```

`.env.local` 파일을 프로젝트 루트에 생성:

```
GEMINI_API_KEY=your-api-key
```

```bash
npm run dev
```

http://localhost:3000 접속.

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 홈 (6개 장르 카드)
│   ├── genre/[slug]/page.tsx # 장르 상세 + 생성
│   └── api/generate/route.ts # Gemini API 라우트
├── components/               # UI 컴포넌트
├── data/genres.ts            # 6개 장르 데이터
└── lib/rate-limit.ts         # Rate limiting
```
