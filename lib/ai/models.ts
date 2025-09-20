export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: ChatModel[] = [
  {
    id: "anthropic/claude-sonnet-4",
    name: "Claude Sonnet 4",
    description: "Anthropic's flagship model for advanced conversations",
  },
  {
    id: "xai/grok-4", // Updated to actual available model
    name: "Grok 4",
    description:
      "xAI's most intelligent model with tool use and real-time search",
  },
  {
    id: "openai/gpt-4.1",
    name: "GPT-4 Chat",
    description: "Latest OpenAI GPT-5 optimized for dialogue and reasoning",
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description: "Google's fast experimental multimodal reasoning model",
  },
];

export const DEFAULT_MODEL_ID = chatModels[0].id;
export const DEVELOPMENT_CHAT_MODEL = "models/gemini-1.5-flash";

export const MODEL_OPTIONS = chatModels.map((m) => ({
  value: m.id,
  label: m.name,
}));
