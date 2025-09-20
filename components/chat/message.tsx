import { UIMessage } from "ai";
import React from "react";
import { Message, MessageContent } from "../ai-elements/message";
import { cn } from "@/lib/utils";
import { Response } from "../ai-elements/response";
// import { useTheme } from "next-themes";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "../ai-elements/reasoning";
import { ToolTypeEnum } from "@/lib/ai/tools/constant";
import ToolCall from "./tool-call";
import MessageAction from "./message-action";

interface Props {
  message: UIMessage;
  isLoading: boolean;
}

const PreviewMessage = React.memo(({ message, isLoading }: Props) => {
  // const { theme } = useTheme();
  return (
    <Message
      from={message.role}
      key={message.id}
      className={cn("", message.role !== "user" && "!max-w-full")}
    >
      <MessageContent
        className={cn(
          "text-[15.5px] dark:text-white",
          message.role !== "user"
            ? "!w-full !max-w-full !px-1 !pb-0 !bg-transparent !m-0 !min-h-0"
            : "!bg-muted !p-2.5 text-[14.5px] !text-foreground"
        )}
      >
        {message.parts.map((part, i) => {
          switch (part.type) {
            case "text": {
              return (
                <Response
                  key={`${message.id}-${i}`}
                  // shikiTheme={theme === "light" ? "light-plus" : "dracula"}
                >
                  {part.text}
                </Response>
              );
            }
            case "reasoning": {
              return (
                <Reasoning key={`${message.id}-reason-${i}`}>
                  <ReasoningTrigger />
                  <ReasoningContent>{part.text}</ReasoningContent>
                </Reasoning>
              );
            }

            case ToolTypeEnum.CreateNote: {
              const { toolCallId, state, output, input, errorText } = part;
              return (
                <ToolCall
                  key={toolCallId}
                  toolCallId={toolCallId}
                  type={part.type}
                  input={input}
                  state={state}
                  output={output}
                  errorText={errorText}
                  isLoading={isLoading}
                />
              );
            }
            case ToolTypeEnum.SearchNote: {
              const { toolCallId, state, output, input, errorText } = part;

              return (
                <ToolCall
                  key={toolCallId}
                  toolCallId={toolCallId}
                  type={part.type}
                  input={input}
                  isLoading={isLoading}
                  state={state}
                  output={output}
                  errorText={errorText}
                />
              );
            }
            case ToolTypeEnum.WebSearch: {
              const { toolCallId, state, output, input, errorText } = part;

              return (
                <ToolCall
                  key={toolCallId}
                  toolCallId={toolCallId}
                  type={part.type}
                  input={input}
                  isLoading={isLoading}
                  state={state}
                  output={output}
                  errorText={errorText}
                />
              );
            }
            case ToolTypeEnum.ExtractWebUrl: {
              const { toolCallId, state, output, input, errorText } = part;
              return (
                <ToolCall
                  key={toolCallId}
                  toolCallId={toolCallId}
                  input={input}
                  type={part.type}
                  isLoading={isLoading}
                  state={state}
                  output={output}
                  errorText={errorText}
                />
              );
            }

            default:
              return null;
          }
        })}

        <MessageAction
          key={`action-${message.id}`}
          message={message}
          isLoading={isLoading}
        />
      </MessageContent>
    </Message>
  );
});

PreviewMessage.displayName = "PreviewMessage";
export default PreviewMessage;
