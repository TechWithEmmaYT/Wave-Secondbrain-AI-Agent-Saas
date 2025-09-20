import { ChatStatus, UIMessage } from "ai";
import React, { FC, useEffect } from "react";
import { Conversation, ConversationContent } from "../ai-elements/conversation";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import PreviewMessage from "./message";
import { RiCircleFill } from "@remixicon/react";
import { useStickToBottom } from "use-stick-to-bottom";

interface Props {
  chatId?: string;
  messages: UIMessage[];
  error?: Error;
  status: ChatStatus;
  isLoading: boolean;
}

const ChatMessages: FC<Props> = ({
  messages = [],
  status,
  isLoading,
  error,
}) => {
  const { scrollRef, contentRef, scrollToBottom } = useStickToBottom();

  useEffect(() => {
    if (messages || status === "submitted" || status === "ready") {
      scrollToBottom();
    }
  }, [messages, status, scrollToBottom]);

  return (
    <div ref={scrollRef} className="overflow-y-auto h-auto">
      <Conversation className="h-auto min-h-[calc(100vh-157px)]">
        <ConversationContent className="w-full h-auto !pb-30 pt-15 flex flex-col gap-5  lg:px-0 md:max-w-3xl mx-auto">
          {isLoading && <LoadingMessages />}

          {!isLoading && messages.length === 0 && <Greeting />}

          {/* {Preview Message} */}
          {messages?.map((message, index) => (
            <PreviewMessage
              key={message.id}
              message={message}
              isLoading={
                status === "streaming" && messages.length - 1 === index
              }
            />
          ))}

          {status === "submitted" &&
            messages.length > 0 &&
            messages[messages.length - 1]?.role === "user" && (
              <span>
                <RiCircleFill className="w-4 h-4 animate-bounce rounded-full dark:text-white" />
              </span>
            )}

          {status === "streaming" &&
            messages.length > 0 &&
            messages[messages.length - 1]?.role === "assistant" && (
              <span>
                <RiCircleFill className="w-4 h-4 animate-bounce rounded-full dark:text-white" />
              </span>
            )}

          {status === "error" && error && (
            <ErrorAlert
              title="Chat Error"
              message={error.message ?? "Something went wrong"}
            />
          )}
        </ConversationContent>
      </Conversation>
      <div ref={contentRef} />
    </div>
  );
};

function LoadingMessages() {
  return (
    <div className="w-full max-w-full mx-auto mt-5">
      <div className="flex items-start space-x-3">
        <Skeleton className="h-8 w-8 rounded-full" />

        <div className="w-full flex flex-col space-y-2">
          <Skeleton className="h-8 w-8/12 rounded-lg" />
          <Skeleton className="h-8 w-w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function Greeting() {
  return (
    <div className="w-full h-full md:mt-3 px-2 flex flex-col">
      <div className="text-2xl font-semibold opacity-0 fade-in-up [animation-delay:200ms]">
        Hello there!
      </div>
      <div className="text-2xl  text-zinc-500 opacity-0 fade-in-up [animation-delay:400ms]">
        How can I help you today?
      </div>
    </div>
  );
}

function ErrorAlert({ title, message }: { title: string; message: string }) {
  return (
    <>
      <Alert
        variant="destructive"
        className="w-full bg-destructive/20 border-destructive/50"
      >
        <AlertCircleIcon className="h-4 w-4" />
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription className="whitespace-break-spaces">
            <p>{message}</p>
          </AlertDescription>
        </div>
      </Alert>
    </>
  );
}
export default ChatMessages;
