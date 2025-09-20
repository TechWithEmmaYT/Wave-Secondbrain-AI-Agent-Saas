/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseChatHelpers } from "@ai-sdk/react";
import { ChatStatus, UIMessage } from "ai";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "../ai-elements/prompt-input";
import { cn } from "@/lib/utils";
import { MODEL_OPTIONS } from "@/lib/ai/models";
import { useLocalChat } from "@/hooks/use-localchat";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ArrowUpIcon, LucideSettings2, XIcon } from "lucide-react";
import { AVAILABLE_TOOLS, AvailableToolType } from "@/lib/ai/tools/constant";
import { Button } from "../ui/button";
import { RiSquareFill } from "@remixicon/react";
import { toast } from "sonner";
import useViewState from "@/hooks/use-view-state";

type Props = {
  chatId: string;
  input: string;
  className?: string;
  setInput: Dispatch<SetStateAction<string>>;
  status: ChatStatus;
  messages: Array<UIMessage>;
  sendMessage: UseChatHelpers<UIMessage>["sendMessage"];
  initialModelId: string;
  disabled?: boolean;
  stop: () => void;
};

const ChatInput: FC<Props> = ({
  chatId,
  input,
  initialModelId,
  status,
  className,
  setInput,
  sendMessage,
  disabled,
  stop,
}) => {
  const { localModelId, setLocalModelId } = useLocalChat();
  const { setIsChatView } = useViewState();
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);
  const [selectedTool, setSelectedTool] = useState<AvailableToolType | null>(
    null
  );

  const selectedModelId = localModelId || initialModelId;

  const handleInput = (e: any) => {
    const newValue = e.target.value;
    setInput(newValue);
  };

  const handleSelect = (value: string) => {
    setLocalModelId(value);
  };

  const onSelectTool = (tool: AvailableToolType) => {
    setSelectedTool(tool);
    setToolsOpen(false);
  };

  const removeTool = () => {
    setSelectedTool(null);
  };

  const handleStop = () => {
    stop();
    toast.info("Generation stopped!!");
  };

  const onSubmit = useCallback(() => {
    if (disabled) return;
    if (!input.trim()) {
      toast.error("Please type in a message");
      return;
    }

    if (!chatId) {
      toast.error("Please reload chatId not found");
      return;
    }

    window.history.replaceState({}, "", `/chat/${chatId}`);
    setIsChatView(true);

    if (status === "streaming") {
      toast.error(
        "Please wait for the current response to finish or stop it first!"
      );
      return;
    }

    sendMessage(
      {
        role: "user",
        parts: [
          {
            type: "text",
            text: input,
          },
        ],
      },
      {
        body: {
          selectedModelId: selectedModelId,
          selectedToolName: selectedTool?.name || null,
        },
      }
    );
    setInput("");
  }, [
    input,
    chatId,
    status,
    disabled,
    selectedTool,
    selectedModelId,
    setInput,
    sendMessage,
    setIsChatView,
  ]);

  const isGenerating = status === "streaming" || status === "submitted";
  const placeholder = "Ask, search or create note...";
  return (
    <PromptInput
      className={cn(
        `relative bg-white dark:bg-[#242628] ring-border shadow-md dark:shadow-black/5 !rounded-3xl !divide-y-0 pb-2`,
        className && className
      )}
      onSubmit={onSubmit}
    >
      <div className="relative">
        {selectedTool && (
          <div className="flex items-center gap-1 pt-1.5 pl-2">
            <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium border">
              <selectedTool.icon size={12} />
              <span>{selectedTool.name}</span>
              <button
                className="ml-1 hover:bg-primary/20 rounded-sm p-0.5 transition-colors"
                onClick={removeTool}
              >
                <XIcon size={10} />
              </button>
            </div>
          </div>
        )}

        <PromptInputTextarea
          placeholder={placeholder}
          rows={2}
          autoFocus
          value={input}
          className="min-h-16 pt-2 overflow-hidden !text-sm"
          onChange={handleInput}
        />
      </div>

      <PromptInputToolbar>
        <PromptInputTools>
          <ModelSelector
            selectedModelId={selectedModelId}
            onSelect={handleSelect}
          />

          <Popover open={toolsOpen} onOpenChange={setToolsOpen}>
            <PopoverTrigger asChild>
              <PromptInputButton
                className="text-muted-foreground"
                size="sm"
                variant="outline"
              >
                <LucideSettings2 size={16} />
                Tools
              </PromptInputButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-48 px-1.5 py-2 drop-shadow-sm"
              align="start"
            >
              <ul className="space-y-px">
                {AVAILABLE_TOOLS?.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <li key={tool.type}>
                      <button
                        className="w-full flex items-center gap-1 p-2 rounded-md hover:bg-accent text-left text-sm transition-colors "
                        onClick={() => onSelectTool(tool)}
                      >
                        <Icon size={14} className="text-muted-foreground" />
                        {tool.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </PopoverContent>
          </Popover>
        </PromptInputTools>

        {isGenerating ? (
          <StopButton stop={handleStop} />
        ) : (
          <PromptInputSubmit
            status={status}
            disabled={!input.trim() || disabled}
            className="absolute right-2 rounded-full bottom-1.5 !text-white"
          >
            <ArrowUpIcon size={25} />
          </PromptInputSubmit>
        )}
      </PromptInputToolbar>
    </PromptInput>
  );
};

function ModelSelector({
  selectedModelId,
  onSelect,
}: {
  selectedModelId: string;
  onSelect: (value: string) => void;
}) {
  return (
    <>
      <PromptInputModelSelect
        value={selectedModelId}
        onValueChange={(value) => {
          onSelect(value);
        }}
      >
        <PromptInputModelSelectTrigger className="bg-white dark:bg-inherit border">
          <PromptInputModelSelectValue />
        </PromptInputModelSelectTrigger>
        <PromptInputModelSelectContent>
          {MODEL_OPTIONS.map((model) => (
            <PromptInputModelSelectItem key={model.value} value={model.value}>
              {model.label}
            </PromptInputModelSelectItem>
          ))}
        </PromptInputModelSelectContent>
      </PromptInputModelSelect>
    </>
  );
}

function StopButton({ stop }: { stop: () => void }) {
  return (
    <Button
      size="icon"
      className="!bg-muted rounded-full dark:!bg-black border cursor-pointer"
      onClick={stop}
    >
      <RiSquareFill size={14} className="text-black dark:text-white" />
    </Button>
  );
}
export default ChatInput;
