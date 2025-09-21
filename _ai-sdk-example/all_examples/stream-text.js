import "dotenv/config";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

const google_model = google("models/gemini-2.0-flash-exp");

async function askQuestion(prompt, model) {
  const { textStream } = await streamText({
    model,
    prompt,
  });
  for await (const text of textStream) {
    process.stdout.write(text);
  }
  //final text
  //const finalText  = await text;

  return textStream;
}

await askQuestion("What is llm", google_model);
