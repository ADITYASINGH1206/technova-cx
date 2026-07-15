/* ============================================================
   Gemini API Client — TechNova CX Command Center
   Lightweight wrapper for generateContent + embedText
   ============================================================ */

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not set in environment variables");
  return key;
}

// --- Types ---

export interface GeminiTool {
  functionDeclarations: GeminiFunctionDeclaration[];
}

export interface GeminiFunctionDeclaration {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, { type: string; description: string; enum?: string[] }>;
    required: string[];
  };
}

export interface GeminiMessage {
  role: "user" | "model";
  parts: GeminiPart[];
}

export type GeminiPart =
  | { text: string }
  | { functionCall: { name: string; args: Record<string, unknown> } }
  | { functionResponse: { name: string; response: { result: unknown } } };

export interface GeminiResponse {
  candidates: {
    content: {
      parts: GeminiPart[];
      role: string;
    };
    finishReason: string;
  }[];
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

// --- Retry Logic ---

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.ok) return response;

    // Rate limited — back off and retry
    if (response.status === 429 && attempt < maxRetries) {
      const backoffMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;
      console.warn(
        `[Gemini] Rate limited (429). Retrying in ${Math.round(backoffMs)}ms (attempt ${attempt + 1}/${maxRetries})`
      );
      await new Promise((r) => setTimeout(r, backoffMs));
      continue;
    }

    // Server error — retry
    if (response.status >= 500 && attempt < maxRetries) {
      const backoffMs = Math.pow(2, attempt) * 1000;
      console.warn(
        `[Gemini] Server error (${response.status}). Retrying in ${backoffMs}ms`
      );
      await new Promise((r) => setTimeout(r, backoffMs));
      continue;
    }

    // Non-retryable error
    const errorText = await response.text();
    throw new Error(
      `Gemini API error (${response.status}): ${errorText}`
    );
  }

  throw new Error("Gemini API: max retries exceeded");
}

// --- Core: Generate Content ---

export async function generateContent(options: {
  model: string;
  systemInstruction?: string;
  contents: GeminiMessage[];
  tools?: GeminiTool[];
  responseSchema?: Record<string, unknown>;
  temperature?: number;
  maxOutputTokens?: number;
}): Promise<GeminiResponse> {
  const {
    model,
    systemInstruction,
    contents,
    tools,
    responseSchema,
    temperature = 0.7,
    maxOutputTokens = 2048,
  } = options;

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature,
      maxOutputTokens,
      ...(responseSchema
        ? {
            responseMimeType: "application/json",
            responseSchema,
          }
        : {}),
    },
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  if (tools && tools.length > 0) {
    body.tools = tools;
  }

  const url = `${GEMINI_BASE_URL}/models/${model}:generateContent?key=${getApiKey()}`;

  const response = await fetchWithRetry(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return response.json() as Promise<GeminiResponse>;
}

// --- Helper: Extract text from response ---

export function extractText(response: GeminiResponse): string {
  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) return "";
  return parts
    .filter((p): p is { text: string } => "text" in p)
    .map((p) => p.text)
    .join("");
}

// --- Helper: Extract function calls from response ---

export function extractFunctionCalls(
  response: GeminiResponse
): { name: string; args: Record<string, unknown> }[] {
  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) return [];
  return parts
    .filter(
      (p): p is { functionCall: { name: string; args: Record<string, unknown> } } =>
        "functionCall" in p
    )
    .map((p) => p.functionCall);
}

// --- Helper: Parse JSON from response ---

export function extractJSON<T = unknown>(response: GeminiResponse): T {
  const text = extractText(response);
  try {
    return JSON.parse(text) as T;
  } catch {
    // Try to extract JSON from markdown code block
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
      return JSON.parse(match[1]) as T;
    }
    throw new Error(`Failed to parse JSON from Gemini response: ${text.slice(0, 200)}`);
  }
}

// --- Embeddings ---

export async function embedText(text: string): Promise<number[]> {
  const url = `${GEMINI_BASE_URL}/models/text-embedding-004:embedContent?key=${getApiKey()}`;

  const response = await fetchWithRetry(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "models/text-embedding-004",
      content: {
        parts: [{ text }],
      },
      taskType: "RETRIEVAL_DOCUMENT",
      outputDimensionality: 768,
    }),
  });

  const data = (await response.json()) as {
    embedding: { values: number[] };
  };

  return data.embedding.values;
}

// --- Embed for query (uses RETRIEVAL_QUERY task type) ---

export async function embedQuery(text: string): Promise<number[]> {
  const url = `${GEMINI_BASE_URL}/models/text-embedding-004:embedContent?key=${getApiKey()}`;

  const response = await fetchWithRetry(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "models/text-embedding-004",
      content: {
        parts: [{ text }],
      },
      taskType: "RETRIEVAL_QUERY",
      outputDimensionality: 768,
    }),
  });

  const data = (await response.json()) as {
    embedding: { values: number[] };
  };

  return data.embedding.values;
}
