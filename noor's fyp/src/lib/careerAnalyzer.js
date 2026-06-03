import { OPENAI_API_KEY, OPENAI_MODEL } from "./openaiConfig";

function extractLikelyJson(text) {
  if (!text) return null;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}

function normalizeResult(obj) {
  const recommended_field =
    typeof obj?.recommended_field === "string" ? obj.recommended_field : "";
  const confidence = typeof obj?.confidence === "string" ? obj.confidence : "";
  const reasoning = typeof obj?.reasoning === "string" ? obj.reasoning : "";
  const suggested_skills = Array.isArray(obj?.suggested_skills)
    ? obj.suggested_skills.filter((s) => typeof s === "string")
    : [];

  return { recommended_field, confidence, reasoning, suggested_skills };
}

export async function analyzeCareerFromAnswers(answers, { apiKey } = {}) {
  const key = (apiKey ?? OPENAI_API_KEY ?? "").trim();
  if (!key) {
    throw new Error(
      "Missing OpenAI API key. Add it in src/lib/openaiConfig.js (OPENAI_API_KEY)."
    );
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    throw new Error("No answers found. Please complete the assessment first.");
  }

  const compactAnswers = answers.map((a) => ({
    questionId: a.questionId,
    question: a.question,
    selectedAnswer: a.selectedAnswer,
  }));

  const system = [
    "You are a career guidance engine.",
    "Given a user's answers to a questionnaire, output ONLY a valid JSON object.",
    "Do not wrap in markdown, do not add extra keys.",
    'Return EXACTLY: {"recommended_field": string, "confidence": "Low"|"Medium"|"High", "reasoning": string, "suggested_skills": string[]}.',
  ].join(" ");

  const user = [
    "Analyze the following questionnaire answers and recommend one suitable career/field.",
    "Questionnaire answers (JSON):",
    JSON.stringify(compactAnswers, null, 2),
  ].join("\n");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(
      `OpenAI API request failed (${res.status}). ${errorText || ""}`.trim()
    );
  }

  const payload = await res.json().catch(() => null);
  const content = payload?.choices?.[0]?.message?.content ?? "";
  if (!content) throw new Error("Empty response from OpenAI API.");

  let parsed = null;
  try {
    parsed = JSON.parse(content);
  } catch {
    const maybe = extractLikelyJson(content);
    if (!maybe) throw new Error("Invalid JSON response from OpenAI API.");
    parsed = JSON.parse(maybe);
  }

  const normalized = normalizeResult(parsed);
  if (
    !normalized.recommended_field ||
    !normalized.confidence ||
    !normalized.reasoning
  ) {
    throw new Error("OpenAI response JSON is missing required fields.");
  }

  return normalized;
}

