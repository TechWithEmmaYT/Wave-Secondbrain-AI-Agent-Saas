import useNoteId from "@/hooks/use-note-id";
import { RiFileTextLine } from "@remixicon/react";
import { FC, memo } from "react";

interface NoteCardProps {
  noteId: string;
  title: string;
  content: string;
}

export const NoteCardPreview: FC<NoteCardProps> = memo(
  ({ title, content, noteId }) => {
    const { setNoteId } = useNoteId();
    return (
      <div
        role="button"
        className="flex flex-col gap-2 p-4 bg-muted rounded-md shadow-sm border border-border hover:shadow-md transition-all cursor-pointer"
        onClick={() => setNoteId(noteId)}
      >
        <h4 className="font-semibold text-xl line-clamp-1">{title}</h4>
        <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
      </div>
    );
  }
);

NoteCardPreview.displayName = "NoteCardPreview";

interface NoteItemProps {
  noteId: string;
  title: string;
}

export const NoteItemPreview: FC<NoteItemProps> = memo(({ noteId, title }) => {
  const { setNoteId } = useNoteId();

  return (
    <button
      className="flex w-full item-center gap-2 py-1 text-sm
    dark:text-white/80 text-left hover:bg-accent rounded-sm"
      onClick={() => setNoteId(noteId)}
    >
      <RiFileTextLine className="w-5 h-5" />
      <span>{title}</span>
    </button>
  );
});

NoteItemPreview.displayName = "NoteItemPreview";
