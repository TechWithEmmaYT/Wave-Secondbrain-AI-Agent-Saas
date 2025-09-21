import "dotenv/config";
import { z } from "zod";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const model = google("models/gemini-2.0-flash-exp");

const tools = {
  // Simple function to simulate weather lookup
  getWeather: {
    description: "show the weather in a given city to the user",
    inputSchema: z.object({
      city: z.string(),
    }),
    execute: async ({ city }) => {
      return `The weather in ${city} is sunny and 25°C.`;
    },
  },
};

async function askWeather(prompt) {
  const result = await generateText({
    model,
    system: "You are a helpful assistant that uses tools when needed.",
    prompt: prompt,
    tools: tools,
  });
  //log result
  console.log(result.steps, "results");
  return result.text;
}

const response = await askWeather("What's the weather in newyork?");
console.log(response);

//
//   stopWhen: stepCountIs(3),
