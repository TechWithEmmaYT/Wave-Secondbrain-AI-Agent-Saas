import "dotenv/config";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const model = google("models/gemini-2.0-flash-exp");

async function summarizer(input) {
  const { text } = await generateText({
    model,
    system:
      "You are a helpful assistant that summarizes text clearly and very concisely.",
    prompt: input,
  });

  return text;
}

const response = await summarizer(
  "Large Language Models (LLMs) are AI models trained on massive datasets of text to understand and generate human-like language."
);
console.log(response);

//
//
//
//
//

// messages: [
//   {
//     role: "system",
//     content: "You are a summarizer. Always respond with a short summary.",
//   },
//   { role: "user", content: input },
// ],
