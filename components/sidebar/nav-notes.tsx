import React from "react";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { RiAddLine, RiFileTextLine, RiLoader5Fill } from "@remixicon/react";
import { useCreateNote, useNotes } from "@/features/use-note";
import LoaderOverlay from "../loader-overlay";
import useNoteId from "@/hooks/use-note-id";

const NavNotes = () => {
  const { noteId, setNoteId } = useNoteId();
  const { data, isPending } = useNotes();
  const { mutate, isPending: isLoading } = useCreateNote();

  const notes = data?.data ?? [];

  const onCreate = () => {
    mutate({
      title: "Untitled",
      content: "",
    });
  };

  const onClick = (id: string) => {
    setNoteId(id);
  };
  return (
    <>
      <LoaderOverlay text="Creating note..." show={isLoading} />
      <SidebarGroup>
        <SidebarGroupLabel>
          <h5>Notes</h5>
          <SidebarGroupAction
            className="mt-[1.5px] flex items-center size-5.5 rounded-md bg-primary/20 border cursor-pointer"
            onClick={onCreate}
          >
            <RiAddLine className="!size-5" />
            <span className="sr-only">Add Notes</span>
          </SidebarGroupAction>
        </SidebarGroupLabel>
        <SidebarGroupContent className="w-full h-auto min-h-32 max-h-[360px] overflow-y-auto">
          <SidebarMenu>
            {notes?.length === 0 ? (
              <div>No Notes</div>
            ) : isPending ? (
              <div className="flex items-center justify-center">
                <RiLoader5Fill className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              notes?.map((note) => {
                const isActive = note.id === noteId;
                return (
                  <SidebarMenuItem key={note.id}>
                    <SidebarMenuButton
                      className="flex items-center w-full"
                      isActive={isActive}
                      onClick={() => onClick(note.id)}
                    >
                      <span className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <RiFileTextLine className="w-4 h-4 text-primary" />
                      </span>
                      <h5 className="flex-1 truncate">{note.title}</h5>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default NavNotes;
