import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { createOllama } from "ollama-ai-provider";

export const DEFAULT_CHAT_MODEL: string = "chat-model-small";
const ollama = createOllama({
  baseURL: "http://10.223.188.42:3001/process_message/",
});

export const myProvider = customProvider({
  languageModels: {
    "chat-model-small": ollama("llama3.1:8b", { simulateStreaming: true }),
    "chat-model-reasoning": wrapLanguageModel({
      model: ollama("llama3.1:8b", { simulateStreaming: true }),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    "title-model": ollama("llama3.1:8b", { simulateStreaming: true }),
    "artifact-model": ollama("llama3.1:8b", { simulateStreaming: true }),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: "chat-model-small",
    name: "OMA-Small",
    description: "Small model for fast, lightweight tasks",
  },
];
