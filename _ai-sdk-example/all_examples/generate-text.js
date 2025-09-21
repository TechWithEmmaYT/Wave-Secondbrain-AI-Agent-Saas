import "dotenv/config";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const model = google("models/gemini-2.0-flash-exp");

async function askQuestion(prompt) {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
}

const response = await askQuestion("What is llm");
console.log(response);
