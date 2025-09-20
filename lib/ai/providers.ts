/* eslint-disable @typescript-eslint/no-explicit-any */
import { customProvider } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { google } from "@ai-sdk/google";
import { chatModels, DEVELOPMENT_CHAT_MODEL } from "./models";

const NODE_ENV = process.env.NODE_ENV!;

export const isProduction = NODE_ENV === "production";

const createLanguageModels = (isProduction: boolean) => {
  const models: Record<string, any> = {};
  chatModels.forEach(
    (model) => (models[model.id] = gateway.languageModel(model.id))
  );

  models[DEVELOPMENT_CHAT_MODEL] = google.languageModel(DEVELOPMENT_CHAT_MODEL);

  models["title-model"] = isProduction
    ? gateway.languageModel("google/gemini-2.0-flash")
    : google.languageModel(DEVELOPMENT_CHAT_MODEL);

  return models;
};

export const myProvider = customProvider({
  languageModels: createLanguageModels(isProduction),
});
