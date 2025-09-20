"use client";
import React from "react";
import ChatInterface from "@/components/chat";
import { useParams } from "next/navigation";
import { useChatById } from "@/features/use-chat";
import Header from "../../_common/header";

const SingleChat = () => {
  const params = useParams();
  const chatId = params.chatId as string;

  const { data, isLoading } = useChatById({
    id: chatId,
    enabled: true,
  });

  const chat = data ?? {};
  console.log(data, "data");

  const title = chat?.title ?? "Untitled";
  const initialMessages = chat?.messages ?? [];

  return (
    <>
      <Header title={title} showActions />
      <div className="relative w-full">
        <ChatInterface
          chatId={chatId}
          initialMessages={initialMessages}
          initialLoading={isLoading}
          onlyInput={false}
        />
      </div>
    </>
  );
};

export default SingleChat;
