import {
  LucideFilePlus,
  LucideGlobe,
  LucideIcon,
  LucideSearch,
} from "lucide-react";

export const ToolNameEnum = {
  CreateNote: "createNote",
  SearchNote: "searchNote",
  WebSearch: "webSearch",
  ExtractWebUrl: "extractWebUrl",
} as const;

export type ToolNameType = (typeof ToolNameEnum)[keyof typeof ToolNameEnum];

export const ToolTypeEnum = {
  CreateNote: "tool-createNote",
  SearchNote: "tool-searchNote",
  WebSearch: "tool-webSearch",
  ExtractWebUrl: "tool-extractWebUrl",
} as const;

export type ToolType = (typeof ToolTypeEnum)[keyof typeof ToolTypeEnum];

export interface AvailableToolType {
  toolName: ToolNameType;
  type: ToolType;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const AVAILABLE_TOOLS: AvailableToolType[] = [
  {
    toolName: ToolNameEnum.CreateNote,
    type: ToolTypeEnum.CreateNote,
    name: "Create Note",
    description: "Create a new note with a title and content",
    icon: LucideFilePlus,
  },
  {
    toolName: ToolNameEnum.SearchNote,
    type: ToolTypeEnum.SearchNote,
    name: "Search Note",
    description: "Search your saved notes for relevant information",
    icon: LucideSearch,
  },
  {
    toolName: ToolNameEnum.WebSearch,
    type: ToolTypeEnum.WebSearch,
    name: "Web Search",
    description: "Search the web for current information",
    icon: LucideGlobe,
  },
];
