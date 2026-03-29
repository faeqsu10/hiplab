import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGenreBySlug } from "@/data/genres";
import { checkRateLimit } from "@/lib/rate-limit";

export const maxDuration = 30;

const MOODS = ["어두운", "몽환적", "공격적", "차분한"] as const;
const ENERGIES = ["low", "mid", "high"] as const;
const STYLES = ["허세형", "내면고백형", "배틀형"] as const;

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: "잠시 후 다시 시도해주세요" },
        {
          status: 429,
          headers: { "X-RateLimit-Remaining": "0" },
        }
      );
    }

    const body = await request.json();
    const { slug, topic, mood, energy, style } = body;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "장르를 선택해주세요" }, { status: 400 });
    }

    const genre = getGenreBySlug(slug);
    if (!genre) {
      return NextResponse.json({ error: "존재하지 않는 장르입니다" }, { status: 404 });
    }

    if (!topic || typeof topic !== "string" || topic.length < 1 || topic.length > 200) {
      return NextResponse.json({ error: "주제를 1-200자로 입력해주세요" }, { status: 400 });
    }

    if (!MOODS.includes(mood)) {
      return NextResponse.json({ error: "유효한 무드를 선택해주세요" }, { status: 400 });
    }
    if (!ENERGIES.includes(energy)) {
      return NextResponse.json({ error: "유효한 에너지를 선택해주세요" }, { status: 400 });
    }
    if (!STYLES.includes(style)) {
      return NextResponse.json({ error: "유효한 스타일을 선택해주세요" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API 설정 오류" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: 2000,
      },
    });

    const prompt = `너는 힙합 작곡 어시스턴트다. 다음 장르 정보를 기반으로 한국어 가사와 음악 프롬프트를 생성해라.

장르: ${genre.name}
BPM: ${genre.bpmRange[0]}-${genre.bpmRange[1]}
드럼: ${genre.elements.drums}
베이스: ${genre.elements.bass}
멜로디: ${genre.elements.melody}
플로우: ${genre.elements.flow}
Suno 키워드: ${genre.sunoKeywords.join(", ")}

사용자 요청:
- 주제: ${topic}
- 무드: ${mood}
- 에너지: ${energy}
- 스타일: ${style}

규칙:
- 특정 실존 아티스트의 스타일을 직접 모방하지 마라
- 가사는 한국어로 작성하되, 힙합 특유의 영어 믹스는 자연스럽게 허용
- 장르의 특성(BPM, 드럼 패턴, 베이스, 플로우)이 가사와 프롬프트에 반영되어야 한다

다음 JSON 형식으로 출력해라:
{
  "sunoPrompt": "Suno/Udio에서 사용할 영문 음악 프롬프트 (장르, BPM, 악기, 분위기 포함)",
  "hook": "8마디 훅 (한국어 가사, 캐치하고 반복적)",
  "verse": "16마디 버스 (한국어 가사, 스토리텔링)",
  "beatRecipe": "비트 레시피 (BPM, 킥, 하이햇, 스네어, 멜로디, FX, 구조를 한국어로)"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const parsed = JSON.parse(text);

    if (!parsed.sunoPrompt || !parsed.hook || !parsed.verse || !parsed.beatRecipe) {
      return NextResponse.json({ error: "생성 결과가 불완전합니다" }, { status: 500 });
    }

    return NextResponse.json(parsed, {
      headers: { "X-RateLimit-Remaining": String(remaining) },
    });
  } catch (error) {
    console.error("[generate] Error:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "생성에 실패했습니다. 다시 시도해주세요" }, { status: 500 });
  }
}
