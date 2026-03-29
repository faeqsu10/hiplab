# HipLab 프로젝트 핸드오프

이 문서는 이전 세션의 대화 내용을 정리한 것입니다. 새 세션에서 이어서 작업할 때 참고하세요.

## 프로젝트 아이디어

"힙합 장르를 배우고, 요즘 곡을 찾고, 직접 실험까지 하는 서비스"

### 핵심 3가지 축

1. **장르 탐색기** — 붐뱁, 트랩, 드릴, 레이지, G-펑크, 퐁크, 로파이 등의 장르별 설명, 대표 비트 구조, 대표 악기, 국내/해외 아티스트, 입문곡, 하위 장르
2. **트렌드 탐색기** — "요즘 국내 트랩 뭐가 뜨지?", "외국 붐뱁 revival 추천해줘" 같은 검색. 아티스트, 곡, 기사, 플레이리스트 제공. 국내/해외 분리.
3. **프롬프트형 작곡기 + 가사 실험실** — "90년대 뉴욕 붐뱁 스타일로 만들어줘" 입력 시 비트 구조, BPM, 드럼 패턴, 베이스 스타일, 가사 초안 생성. Suno/Udio용 프롬프트 내보내기.

### 차별점 (포지셔닝)

- Suno, Udio, Gemini Lyria 같은 범용 AI 작곡기와 경쟁하지 않음
- **힙합 특화 UX**로 차별화: 장르 설명이 깊고, 국내/해외 씬을 같이 보고, "왜 이 곡이 트랩인지"를 알려줌
- "AI 힙합 스튜디오"가 아니라 "장르 실험실"

### 재밌는 기능 아이디어

- **"왜 이게 트랩인지" 버튼**: 곡의 특징(808, 하이햇롤, BPM 등)으로 장르 분석
- **"붐뱁 → 트랩 변환"**: 같은 가사를 다른 장르 버전으로 변환
- **"국내 vs 해외"**: 같은 장르의 국내/해외 차이 비교
- **가사 템플릿**: 허세형, 내면고백형, battle형, flex형
- **오늘의 장르 레슨**: 하루 하나씩 짧은 학습

### MVP 단계

- **MVP 1**: 장르 설명 + 곡 추천 + Suno/Udio용 프롬프트 자동 생성 + 가사 초안
- **MVP 2**: 힙합 스타일 챗봇 (BPM, 패턴, 질감, 가사 테마 추천)
- **MVP 3**: MIDI 패턴 추천, 드럼 시퀀스, DAW 프리셋 연결

### 서비스 이름

**HipLab** (힙합 + 연구실) — 짧고, 확장성 좋고, GitHub repo명으로 깔끔

## 현재 세팅 완료 상태

```
~/projects/hiplab/
├── .claude/skills/          ← gstack 28개 스킬 심링크 연결
│   ├── gstack -> ~/projects/gstack
│   ├── office-hours -> gstack/office-hours
│   ├── ship -> gstack/ship
│   ├── review -> gstack/review
│   ├── design-review -> gstack/design-review
│   └── ... (28개 전체)
├── .git/                    ← GitHub public repo 연결
├── tasks/
│   ├── todo.md
│   ├── lessons.md
│   └── worklogs/
├── CLAUDE.md                ← 자동 커밋/푸시 + 표준 개발 룰
├── HANDOFF.md               ← 이 파일
└── README.md
```

- GitHub: https://github.com/faeqsu10/hiplab (public)
- gstack 스킬: 프로젝트 로컬 심링크 (글로벌 설치 아님)
- skill_prefix: false (프리픽스 없이 `/qa`, `/ship` 등으로 사용)

## gstack 워크플로우 (사용자가 공부한 내용)

```
기획 → 설계 → 개발 → 검수 → 테스트 → 출시 → 회고
```

| 단계 | 스킬 | 역할 |
|------|------|------|
| 기획 | `/office-hours` | 아이디어 → 기획서 (소크라테스식 6가지 질문) |
| 범위 조정 | `/plan-ceo-review` | 대표 관점에서 키울지 줄일지 |
| 기술 설계 | `/plan-eng-review` | 아키텍처, 테스트 계획 |
| 코드 검수 | `/review` | PR 코드 리뷰 |
| 디자인 점검 | `/design-review` | 80개 항목 디자인 QA |
| QA 테스트 | `/qa` | 브라우저 자동 테스트 (0.1초) |
| 보안 점검 | `/cso` | OWASP Top 10 + STRIDE |
| 출시 준비 | `/ship` | VERSION, CHANGELOG, PR 생성 |
| 배포 | `/land-and-deploy` | merge → deploy → canary |
| 모니터링 | `/canary` | 배포 후 모니터링 |
| 회고 | `/retro` | 주간 회고 |

### 추천 실행 순서 (이번 프로젝트)

1. **`/office-hours`** ← 다음 단계. 여기서 시작!
2. `/plan-ceo-review` (범위 조정)
3. `/plan-eng-review` (기술 설계)
4. 개발 시작
5. `/review` → `/design-review` → `/qa` → `/ship`

## 다음 할 일

**이 폴더에서 Claude Code를 열고 `/office-hours`를 실행하세요.**

```bash
cd ~/projects/hiplab
claude
```

`/office-hours`가 개리탄(YC)의 6가지 질문으로 아이디어를 정리해줍니다:
1. 진짜 수요가 있는가?
2. 지금은 어떻게 하고 있는가?
3. 구체적으로 누구한테 필요한가?
4. 가장 작은 시작은 뭔가?
5. 직접 본적 있는가?
6. 미래에도 필요한가?

위의 아이디어 내용을 참고해서 답변하면 됩니다.
