"use client";
import React from "react";
import useNoteId from "@/hooks/use-note-id";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import NoteView from "./note-view";

const NotDialog = () => {
  const { noteId, clearNoteId } = useNoteId();

  const isOpen = Boolean(noteId);

  const handleClose = () => {
    clearNoteId();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="p-0 border-l
      lg:w-1/2
       sm:max-w-[50vw]"
      >
        <SheetHeader className="py-2 border-b bg-muted px-4">
          <SheetTitle />
        </SheetHeader>
        <div className="flex-1 min-h-20 max-h-screen overflow-y-auto">
          {noteId && <NoteView noteId={noteId} />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotDialog;
