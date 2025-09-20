"use client";
import React, { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import Link from "next/link";
import { DefaultChatTransport, UIMessage } from "ai";
import { generateUUID } from "@/lib/utils";
import { DEFAULT_MODEL_ID } from "@/lib/ai/models";
import ChatInput from "./chat-input";
import ChatMessages from "./chat-messages";
import { ToolNameEnum } from "@/lib/ai/tools/constant";
import { useQueryClient } from "@tanstack/react-query";
import { useCheckGenerations } from "@/features/use-subscription";

type Props = {
  chatId: string;
  initialMessages: UIMessage[];
  initialLoading: boolean;
  onlyInput: boolean;
  inputDisabled?: boolean;
};

const ChatInterface = (props: Props) => {
  const {
    chatId,
    initialMessages,
    initialLoading,
    onlyInput = false,
    inputDisabled,
  } = props;
  const queryClient = useQueryClient();
  const [input, setInput] = useState<string>("");

  const { data: subscription } = useCheckGenerations();

  console.log(chatId, "chatid");

  const { messages, setMessages, sendMessage, status, stop, error } =
    useChat<UIMessage>({
      id: chatId,
      messages: initialMessages,
      generateId: generateUUID,
      transport: new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest({ messages, id, body }) {
          return {
            body: {
              id,
              message: messages.at(-1),
              selectedModelId: DEFAULT_MODEL_ID,
              ...body,
            },
          };
        },
      }),
      async onToolCall({ toolCall }) {
        console.log(toolCall.toolCallId, "toolId");
        if (toolCall.toolName === ToolNameEnum.CreateNote) {
          queryClient.invalidateQueries({
            queryKey: ["notes"],
            refetchType: "all",
          });
        }
      },
      onFinish: () => {},
      onError: (error) => {
        console.log("Chat error", error);
      },
    });

  useEffect(() => {
    if (initialMessages && initialMessages?.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages, setMessages]);

  const hasReachedLimit =
    !!subscription &&
    subscription.generationsLimit !== null &&
    subscription.generationsUsed >= subscription.generationsLimit;

  if (onlyInput) {
    return (
      <div className="w-full relative">
        {hasReachedLimit && <GenerationLimitAlert />}
        <ChatInput
          chatId={chatId}
          input={input}
          setInput={setInput}
          className="w-full"
          disabled={inputDisabled}
          messages={messages}
          status={status}
          stop={stop}
          initialModelId={DEFAULT_MODEL_ID}
          sendMessage={sendMessage}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen min-w-0 overflow-x-hidden bg-background">
      {/* {Chat Messages} */}
      <ChatMessages
        chatId={chatId}
        messages={messages}
        status={status}
        error={error}
        isLoading={initialLoading}
      />

      <div className="sticky bottom-1 inset-y-1 flex gap-2 px-4 pb-1 mt-2 w-full bg-background z-[1]">
        <div className="w-full relative mx-auto md:max-w-3xl">
          {hasReachedLimit && <GenerationLimitAlert />}
          <ChatInput
            chatId={chatId}
            input={input}
            setInput={setInput}
            className="w-full"
            messages={messages}
            status={status}
            stop={stop}
            initialModelId={DEFAULT_MODEL_ID}
            sendMessage={sendMessage}
            disabled={inputDisabled}
          />
        </div>
      </div>
    </div>
  );
};

function GenerationLimitAlert() {
  return (
    <div className="w-full absolute -top-6 mt-[0.3]">
      <div
        className="bg-primary/10 font-medium rounded-t-3xl
        px-4 pt-1.5 pb-4 flex items-center justify-between text-xs w-full overflow-hidden"
      >
        <div className="break-words">
          You’ve run out of free AI responses.{" "}
          <Link
            href="/billing"
            className="text-primary font-semibold hover:underline"
          >
            Upgrade Wave AI
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
