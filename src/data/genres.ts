export interface Genre {
  slug: string;
  name: string;
  emoji: string;
  color: string;
  bpmRange: [number, number];
  whyItSounds: string;
  elements: {
    drums: string;
    bass: string;
    melody: string;
    flow: string;
  };
  representativeSongs: Array<{
    title: string;
    artist: string;
    year: number;
    isKorean: boolean;
  }>;
  sunoKeywords: string[];
  exampleTopic: string;
}

export const genres: Genre[] = [
  {
    slug: "trap",
    name: "Trap",
    emoji: "🔥",
    color: "var(--genre-trap)",
    bpmRange: [140, 170],
    whyItSounds:
      "808 서브베이스가 깔리고, 하이햇이 트리플렛으로 굴러가면서 생기는 바운스. 스네어 대신 클랩을 쓰고, 신스 멜로디가 어둡고 미니멀하게 깔린다.",
    elements: {
      drums: "808킥 + 트리플렛 하이햇 + 클랩",
      bass: "808 서브베이스 (글라이드)",
      melody: "다크 신스, 피아노, 벨",
      flow: "트리플렛 랩, 애드리브 다수 (yeah, skrrt, ay)",
    },
    representativeSongs: [
      { title: "March Madness", artist: "Future", year: 2015, isKorean: false },
      { title: "SICKO MODE", artist: "Travis Scott", year: 2018, isKorean: false },
      { title: "왜", artist: "키드밀리", year: 2019, isKorean: true },
    ],
    sunoKeywords: ["trap", "808 sub bass", "triplet hi-hats", "dark synth", "hard-hitting"],
    exampleTopic: "새벽 3시 한강 드라이브",
  },
  {
    slug: "boom-bap",
    name: "Boom Bap",
    emoji: "🎧",
    color: "var(--genre-boom-bap)",
    bpmRange: [85, 100],
    whyItSounds:
      "킥(boom)과 스네어(bap)의 묵직한 조합이 핵심. 재즈/소울 샘플을 잘라 붙이고, 비닐 느낌의 따뜻한 질감이 있다. 뉴욕 지하철처럼 거칠지만 리듬감 있는 소리.",
    elements: {
      drums: "하드 킥 + 크래킹 스네어 + 스윙 하이햇",
      bass: "펑크/재즈 베이스 샘플 루프",
      melody: "재즈 피아노, 소울 보컬 샘플, 혼 섹션",
      flow: "리릭 중심, 멀티실러빅 라임, 스토리텔링",
    },
    representativeSongs: [
      { title: "N.Y. State of Mind", artist: "Nas", year: 1994, isKorean: false },
      { title: "C.R.E.A.M.", artist: "Wu-Tang Clan", year: 1993, isKorean: false },
      { title: "Mugunghwa", artist: "Dok2", year: 2016, isKorean: true },
    ],
    sunoKeywords: ["boom bap", "vinyl crackle", "jazz sample", "hard kick snare", "90s hip hop"],
    exampleTopic: "동네 뒷골목에서 자란 이야기",
  },
  {
    slug: "drill",
    name: "Drill",
    emoji: "⚡",
    color: "var(--genre-drill)",
    bpmRange: [140, 145],
    whyItSounds:
      "트랩의 어두운 사촌. 슬라이딩 808이 음정을 오르내리면서 위협적인 분위기를 만든다. 템포는 트랩과 비슷하지만 멜로디가 더 어둡고 미니멀하다.",
    elements: {
      drums: "스터터링 하이햇 + 무거운 808 + 리버스 심벌",
      bass: "슬라이딩 808 (글라이드가 시그니처)",
      melody: "다크 피아노, 스트링, 미니멀 신스",
      flow: "공격적, 짧은 문장, 반복적 패턴",
    },
    representativeSongs: [
      { title: "Computers", artist: "Bobby Shmurda", year: 2014, isKorean: false },
      { title: "Body", artist: "Tion Wayne & Russ Millions", year: 2021, isKorean: false },
      { title: "MOMMAE", artist: "Jay Park", year: 2015, isKorean: true },
    ],
    sunoKeywords: ["drill", "sliding 808", "dark melody", "aggressive", "UK drill"],
    exampleTopic: "도시의 밤거리를 걷는 순간",
  },
  {
    slug: "lofi",
    name: "Lo-fi Hip Hop",
    emoji: "🌙",
    color: "var(--genre-lofi)",
    bpmRange: [70, 90],
    whyItSounds:
      "의도적으로 로우파이하게 만든 따뜻한 사운드. 비닐 크랙, 테이프 히스, 디튠된 피아노가 향수를 자극한다. 비 오는 날 창가에서 듣는 느낌.",
    elements: {
      drums: "소프트 킥 + 사이드체인 + 셔플 하이햇",
      bass: "워밍 서브베이스, 부드러운 저음",
      melody: "디튠된 피아노, 재즈 기타, 로즈 키보드",
      flow: "보컬 없는 인스트루멘탈 또는 촙드 보컬 샘플",
    },
    representativeSongs: [
      { title: "Affection", artist: "Jinsang", year: 2016, isKorean: false },
      { title: "Snowflake", artist: "Idealism", year: 2017, isKorean: false },
      { title: "비가 오는 날엔", artist: "Chillhop", year: 2020, isKorean: true },
    ],
    sunoKeywords: ["lo-fi hip hop", "vinyl crackle", "chill", "jazz piano", "relaxing beat"],
    exampleTopic: "비 오는 일요일 오후 카페",
  },
  {
    slug: "rage",
    name: "Rage",
    emoji: "💀",
    color: "var(--genre-rage)",
    bpmRange: [150, 160],
    whyItSounds:
      "디스토션 걸린 신스와 과격한 808이 충돌하는 카오스. Playboi Carti가 대중화한 스타일로, 의도적으로 거칠고 날 것 그대로의 에너지를 추구한다.",
    elements: {
      drums: "하드 808 + 크래시 심벌 + 미니멀 하이햇",
      bass: "디스토션 808, 과포화 서브베이스",
      melody: "디스토션 신스, 비명 같은 리드, 노이즈",
      flow: "애드리브 중심, 반복적, 에너지 극대화",
    },
    representativeSongs: [
      { title: "Stop Breathing", artist: "Playboi Carti", year: 2020, isKorean: false },
      { title: "Overseas", artist: "Lancey Foux", year: 2021, isKorean: false },
      { title: "MONEY", artist: "Dawn", year: 2021, isKorean: true },
    ],
    sunoKeywords: ["rage beat", "distorted synth", "aggressive 808", "high energy", "chaotic"],
    exampleTopic: "새벽 클럽에서 터지는 에너지",
  },
  {
    slug: "gfunk",
    name: "G-Funk",
    emoji: "🚗",
    color: "var(--genre-gfunk)",
    bpmRange: [90, 100],
    whyItSounds:
      "웨스트코스트 햇살을 소리로 만든 것. 신스 패드가 부드럽게 깔리고, 펑키한 베이스라인 위로 여유로운 랩이 흐른다. 로우라이더 타고 LA 해안도로 달리는 느낌.",
    elements: {
      drums: "펑키 킥스네어 + 카우벨 + 핑거스냅",
      bass: "미니무그 베이스, 펑키 슬랩 베이스",
      melody: "신스 패드, 톡톡 튀는 리드, 웨스트코스트 휘슬",
      flow: "여유로운 레이드백 플로우, 멜로딕",
    },
    representativeSongs: [
      { title: "Nuthin' but a 'G' Thang", artist: "Dr. Dre", year: 1992, isKorean: false },
      { title: "Gin and Juice", artist: "Snoop Dogg", year: 1993, isKorean: false },
      { title: "Dding", artist: "JVCKI WAI", year: 2018, isKorean: true },
    ],
    sunoKeywords: ["g-funk", "synth pad", "funky bass", "west coast", "laid back"],
    exampleTopic: "여름 해변 드라이브",
  },
];

export function getGenreBySlug(slug: string): Genre | undefined {
  return genres.find((g) => g.slug === slug);
}

export function getAllGenres(): Genre[] {
  return genres;
}
