"use client";
import React from "react";
import { RiEmotionHappyFill } from "@remixicon/react";
import Header from "../../_common/header";
import RecentNotes from "./recent-notes";
import ChatInterface from "@/components/chat";
import useViewState from "@/hooks/use-view-state";
import { cn } from "@/lib/utils";

const MainSection = (props: { id: string }) => {
  const { isChatView } = useViewState();
  return (
    <>
      <Header showActions={isChatView} />
      <div className="relative w-full">
        <div
          className={cn(
            "w-full ",
            !isChatView && "max-w-2xl mx-auto space-y-5 px-4 md:px-0"
          )}
        >
          {!isChatView && (
            <div className="w-full flex items-center justify-center mt-16">
              <h1
                className="flex items-center gap-2 font-semibold text-pretty text-center
              tracking-tighter text-gray-800 dark:text-white sm:text-[30px]
              md:text-[35px] text-[24px]
             opacity-0 fade-in-up [animation-delay:200ms] z-0"
              >
                <RiEmotionHappyFill className="!size-[24px] md:!size-[40px] lg:mt-2" />
                How can I help you today?
              </h1>
            </div>
          )}
          {/* {Chat Interface } */}
          <ChatInterface
            chatId={props.id}
            initialMessages={[]}
            initialLoading={false}
            onlyInput={!isChatView}
          />

          {!isChatView && (
            <div className="w-full pt-7">
              <div className="w-full">
                <span className="text-sm dark:text-white/50">Recent notes</span>
              </div>
              {/* {Recent Notes} */}
              <RecentNotes />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainSection;
