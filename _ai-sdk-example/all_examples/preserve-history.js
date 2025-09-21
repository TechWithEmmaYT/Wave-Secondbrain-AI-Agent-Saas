import "dotenv/config";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const model = google("models/gemini-2.0-flash-exp");

// Start with an empty history [type of ModelMessage[]]
const messages = [
  {
    role: "system",
    content: "You are a helpful recipe assistant.",
  },
];

async function chatWithRecipeAssistant(userInput) {
  // Add the user's message to history
  messages.push({ role: "user", content: userInput });
  // Call the model with the full history
  const result = await generateText({
    model,
    messages: messages,
  });
  // Save the AI response in history
  messages.push({ role: "assistant", content: result.text });
  return messages;
}

// Example conversation
const resp = await chatWithRecipeAssistant(
  "Give me a very short recipe for fried rice."
);
console.log("AI:", resp);
