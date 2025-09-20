"use client";
import React, { useEffect, useRef, useState } from "react";
import { useNote, useUpdateNote } from "@/features/use-note";
import { RiLoader5Fill } from "@remixicon/react";
import { AutosizeTextarea, AutosizeTextAreaRef } from "../ui/autosize-textarea";
import { Button } from "../ui/button";

const NoteView = ({ noteId }: { noteId: string }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const titleTextareaRef = useRef<AutosizeTextAreaRef | null>(null);
  const contentTextareaRef = useRef<AutosizeTextAreaRef | null>(null);

  const { data, isPending: isLoading } = useNote(noteId);
  const { mutate, isPending } = useUpdateNote();

  const note = data?.data;

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    if (!isLoading) {
      const titleTextAreaEle = titleTextareaRef.current;
      if (titleTextAreaEle) {
        titleTextAreaEle.textArea.style.minHeight = "auto !important";
        titleTextAreaEle.textArea.style.maxHeight = "auto !important";
        titleTextAreaEle.textArea.focus();
      }
    }
  }, [isLoading]);

  const handleUpdate = () => {
    if (!noteId) return;
    mutate({
      id: noteId,
      json: {
        title: title,
        content: content,
      },
    });
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      contentTextareaRef.current?.textArea.focus();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[20vh]">
        <RiLoader5Fill className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full p-6">
      <div className="w-full pl-2 mb-3">
        <div className="border-b">
          <AutosizeTextarea
            ref={titleTextareaRef}
            value={title}
            onKeyDown={handleTitleKeyDown}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled note..."
            className="w-full resize-none !border-none
          outline-none bg-transparent font-bold
          placeholder:text-muted-foreground/40 text-4xl leading-tight
          overflow-hidden !px-0 focus-visible:!ring-0
          focus-visible:!ring-offset-0
          "
          />
        </div>
      </div>

      <div className="w-full pl-2">
        <AutosizeTextarea
          ref={contentTextareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="w-full resize-none !border-none
          outline-none bg-transparent
          placeholder:text-muted-foreground/40 text-base leading-relaxed
           !px-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 !min-h-[65vh]"
        />
      </div>

      <div className="sticky bottom-0 py-2 flex justify-end z-50 bg-background">
        <Button
          onClick={handleUpdate}
          disabled={isPending || !noteId || !content}
          className="rounded-full !px-10 !text-lg cursor-pointer disabled:opacity-75"
          size="lg"
        >
          {isPending && <RiLoader5Fill className="!w-7 !h-7 animate-spin" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default NoteView;
