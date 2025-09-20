/* eslint-disable @typescript-eslint/no-explicit-any */
import { tool } from "ai";
import { z } from "zod";
import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export const extractWebUrl = () =>
  tool({
    description:
      "Extract content from one or more URLs. Use this to retrieve, summarize, or analyze page content. Returns structured data per page including URL, title, content, and favicon.",
    inputSchema: z.object({
      urls: z.array(z.url().describe("Website url")),
    }),
    execute: async ({ urls }) => {
      try {
        const response = await tvly.extract(urls, {
          includeFavicon: true,
          includeImages: false,
          topic: "general",
          format: "markdown",
          extractDepth: "basic",
        });

        const results = (response?.results || [])?.map((r: any) => ({
          url: r.url,
          content: r.rawContent || "No content extracted",
          favicon: r.favicon || null,
        }));

        return {
          success: true,
          urls: urls,
          results: results,
          response_time: response.responseTime,
        };
      } catch (error) {
        return {
          success: false,
          message: "Extract url content failed",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
  });
