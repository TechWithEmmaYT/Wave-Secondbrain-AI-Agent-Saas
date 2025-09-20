import prisma from "@/lib/prisma";
import { tool } from "ai";
import { z } from "zod";

export const searchNote = (userId: string) =>
  tool({
    description:
      "Search through the user's notes by keywords in title or content. Use this when the user asks to find or search or lookup notes.",
    inputSchema: z.object({
      query: z.string().describe("Search query to find in notes"),
      limit: z
        .number()
        .optional()
        .describe("Maximum number of resultes (default 10)"),
    }),
    execute: async ({ query, limit = 10 }) => {
      try {
        const notes = await prisma.note.findMany({
          where: {
            userId,
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
                content: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
          orderBy: { createdAt: "desc" },
          take: limit,
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
          },
        });
        return {
          success: true,
          message: `Found ${notes.length} notes matching "${query}"`,
          notes: notes,
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to search notes..",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
  });
