import "dotenv/config";
import { z } from "zod";
import { streamObject } from "ai";
import { google } from "@ai-sdk/google";

const model = google("models/gemini-2.0-flash-exp");

const recipeSchema = z.object({
  title: z.string().describe("The name of the recipe"),
  ingredients: z.array(z.string()).describe("List of ingredients"),
  steps: z.array(z.string()).describe("Step-by-step cooking instructions"),
  cookingTime: z.string().describe("Total cooking time, e.g. '45 minutes'"),
});

async function streamRecipe(dish) {
  const stream = await streamObject({
    model,
    system:
      "You are a recipe generator. Always output JSON with recipe details.",
    prompt: `Give me a recipe for ${dish}.`,
    schema: recipeSchema,
  });

  // Stream partial results
  for await (const part of stream.partialObjectStream) {
    console.log("Partial:", part);
  }
  // Final object once complete
  // const finalRecipe = await stream.finalObject;
  // console.log("Final Recipe:", finalRecipe);
}

await streamRecipe("Pancakes");
