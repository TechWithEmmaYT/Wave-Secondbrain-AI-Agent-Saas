"use client";
import React from "react";
import ChatHistory from "./chat-history";

type Props = {
  children: React.ReactNode;
};

const MainContent = ({ children }: Props) => {
  return (
    <>
      <main className="relative w-full h-auto overflow-hidden">{children}</main>
      <ChatHistory />
    </>
  );
};

export default MainContent;
