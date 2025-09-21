import "dotenv/config";
import { z } from "zod";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

const model = google("models/gemini-2.0-flash-exp");

const recipeSchema = z.object({
  title: z.string().describe("The name of the recipe"),
  ingredients: z.array(z.string()).describe("List of ingredients"),
  steps: z.array(z.string()).describe("Step-by-step cooking instructions"),
  cookingTime: z.string().describe("Total cooking time, e.g. '45 minutes'"),
});

async function generateRecipe(dish) {
  const { object } = await generateObject({
    model,
    system:
      "You are a recipe generator. Always output JSON with recipe details.",
    prompt: `Give me a recipe for ${dish}.`,
    schema: recipeSchema,
  });

  return object;
}

const recipe = await generateRecipe("Spaghetti Bolognese");
console.log(recipe);
