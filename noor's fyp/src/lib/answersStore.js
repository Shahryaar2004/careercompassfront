const STORAGE_KEY = "careerCompass.answers.v1";

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function loadAnswers() {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const parsed = safeJsonParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

export function saveAnswers(answers) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers || []));
}

export function upsertAnswer(answer) {
  const answers = loadAnswers();
  const idx = answers.findIndex((a) => a?.questionId === answer?.questionId);
  if (idx >= 0) answers[idx] = answer;
  else answers.push(answer);
  answers.sort((a, b) => (a?.questionId ?? 0) - (b?.questionId ?? 0));
  saveAnswers(answers);
  return answers;
}

export function getAnswerFor(questionId) {
  const answers = loadAnswers();
  return answers.find((a) => a?.questionId === questionId) || null;
}

export function clearAnswers() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

