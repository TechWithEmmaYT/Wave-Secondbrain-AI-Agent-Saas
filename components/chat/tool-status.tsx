/* eslint-disable @typescript-eslint/no-explicit-any */

import { ToolUIPart } from "ai";
import {
  AlertCircleIcon,
  CircleSlash,
  FileText,
  GlobeIcon,
  Lightbulb,
  SearchIcon,
} from "lucide-react";

export const getToolStatus = (
  toolName: string,
  state: ToolUIPart["state"],
  output?: any
) => {
  const notes = Array.isArray(output?.notes) ? output.motes : [];
  const length = notes?.length;

  if (state === "input-streaming") {
    return { text: "Preparing request...", icon: Lightbulb };
  }

  if (state === "input-available") {
    return toolName === "createNote"
      ? { text: "Creating note..", icon: FileText }
      : toolName === "searchNote"
        ? { text: "Searching note..", icon: SearchIcon }
        : toolName === "webSearch"
          ? { text: "Searching web..", icon: GlobeIcon }
          : toolName === "extractWebUrl"
            ? { text: "Extracting content..", icon: GlobeIcon }
            : { text: "Working...", icon: Lightbulb };
  }

  if (state === "output-available") {
    return toolName === "createNote"
      ? { text: `Result from ${toolName}`, icon: Lightbulb }
      : toolName === "searchNote"
        ? {
            text:
              length > 0 ? `${length} notes found` : "Searched note results",
            icon: SearchIcon,
          }
        : toolName === "webSearch"
          ? { text: "Web saerch results", icon: GlobeIcon }
          : toolName === "extractWebUrl"
            ? { text: "Extracted content", icon: GlobeIcon }
            : { text: "Done", icon: Lightbulb };
  }

  if (state === "output-error") {
    return { text: "Error occured", icon: AlertCircleIcon };
  }

  return { text: "Unknown", icon: CircleSlash };
};
