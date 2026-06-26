import { AI_MODELS } from "@/config/models";

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function generateChatCompletion(messages: OpenRouterMessage[], model: string = AI_MODELS.primary): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const baseUrl = process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is missing.");
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      "X-Title": "Hartly AI"
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.8
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter request failed with status ${response.status}.`);
  }

  const data: {
    choices?: Array<{ message?: { content?: string } }>;
  } = await response.json();

  return data.choices?.[0]?.message?.content?.trim() ?? "";
}
