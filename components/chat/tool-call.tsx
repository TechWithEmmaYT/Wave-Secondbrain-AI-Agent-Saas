/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToolUIPart } from "ai";
import React, { useEffect, useState } from "react";
import { getToolStatus } from "./tool-status";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDownIcon, LoaderIcon, LucideIcon } from "lucide-react";
import { ToolTypeEnum } from "@/lib/ai/tools/constant";
import { NoteCardPreview, NoteItemPreview } from "./tool-note-preview";
import { SearchExtractPreview } from "./tool-search-extract-preview";

const formatToolName = (type: string) => type.replace("tool-", "");

const ToolLoadingIndicator = React.memo(
  ({ loadingText }: { loadingText: string }) => {
    const [time, setTime] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-full p-4 rounded-md bg-background/50 shadow-sm relative">
        <div className="absolute top-2 right-2 text-xs text-primary">
          {time}s
        </div>
        <div className="flex items-center gap-2 mb-2">
          <LoaderIcon className="h-4 2-4 animate-spin" />
          <span className="font-light text-sm">{loadingText}</span>
        </div>
        <div className="w-full h-1 bg-background/30 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-progressBar"></div>
        </div>
      </div>
    );
  }
);

ToolLoadingIndicator.displayName = "ToolLoadingIndicator";

const ToolHeader = React.memo(
  ({
    text,
    icon: Icon,
    collapsible,
  }: {
    text: string;
    icon: LucideIcon;
    collapsible?: boolean;
  }) => {
    const Wrapper = collapsible ? CollapsibleTrigger : "button";
    return (
      <Wrapper className="flex items-center justify-between w-full rounded-md hover:bg-muted/50 py-2 px-2 text-muted-foreground transition-colors border-0">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          <span>{text}</span>
        </div>
        {collapsible && (
          <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
        )}
      </Wrapper>
    );
  }
);

ToolHeader.displayName = "ToolHeader";

const toolRenders: Record<
  ToolUIPart["type"],
  (output: any, input: any) => React.ReactNode
> = {
  [ToolTypeEnum.CreateNote]: (output) => (
    <div className="mb-1.5 mt-1">
      <NoteCardPreview
        noteId={output?.noteId}
        title={output?.title}
        content={output?.content}
      />
    </div>
  ),
  [ToolTypeEnum.SearchNote]: (output, input) => {
    const notes = output ? output?.notes : [];
    return (
      <div className="w-full border border-border/40 rounded-lg py-3 px-1.5">
        <p className="text-sm pl-2">Searched for {`"${input?.query}"`}</p>
        <ul className="w-full list-none !pl-0 pb-4 pt-2 space-y-1 max-h-48 overflow-y-auto">
          {Array.isArray(notes) &&
            notes?.map((note: any) => (
              <li key={note.id}>
                <NoteItemPreview noteId={note.id} title={note.title} />
              </li>
            ))}
        </ul>
      </div>
    );
  },
  [ToolTypeEnum.WebSearch]: (output, input) => {
    return (
      <SearchExtractPreview type="webSearch" input={input} output={output} />
    );
  },
  [ToolTypeEnum.ExtractWebUrl]: (output, input) => {
    return (
      <SearchExtractPreview
        type="extractWebUrl"
        input={input}
        output={output}
      />
    );
  },
};

interface ToolCallProps {
  toolCallId: string;
  type: ToolUIPart["type"];
  state: ToolUIPart["state"];
  output?: any;
  input?: any;
  errorText?: string;
  isLoading: boolean;
}

const ToolCall: React.FC<ToolCallProps> = ({
  isLoading,
  type,
  output,
  state,
  input,
  errorText,
}) => {
  const toolName = formatToolName(type);

  const { text, icon } = getToolStatus(toolName, state, output);

  console.log(type, "type");
  console.log(output, "output");
  console.log(state, "state");
  console.log(input, "input");

  const renderOutput = () => {
    if (state === "output-available") {
      const renderer = toolRenders[type];
      return renderer ? (
        renderer(output, input)
      ) : (
        <div className="mt-2">{JSON.stringify(output)}</div>
      );
    }

    if (state === "output-error") {
      return <div className="text-destructive">{errorText}</div>;
    }

    return null;
  };

  if (
    isLoading &&
    (state === "input-streaming" || state === "input-available")
  ) {
    return <ToolLoadingIndicator loadingText={text} />;
  }

  if (type === ToolTypeEnum.CreateNote) {
    return (
      <>
        <ToolHeader text={text} icon={icon} collapsible={false} />
        <div>{renderOutput()}</div>
      </>
    );
  }

  return (
    <>
      <Collapsible defaultOpen={true}>
        <ToolHeader text={text} icon={icon} collapsible />
        <CollapsibleContent>{renderOutput()}</CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default ToolCall;
