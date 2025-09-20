import React from "react";
import type { UIMessage } from "ai";
import { Action, Actions } from "../ai-elements/actions";
import { ArrowBigDownIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { useCreateNote } from "@/features/use-note";

interface Props {
  message: UIMessage;
  isLoading: boolean;
}

const MessageAction = React.memo(({ isLoading, message }: Props) => {
  const { mutateAsync } = useCreateNote();

  if (isLoading || message.role === "user") return null;

  const getText = () =>
    message.parts
      ?.filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("\n")
      .trim();

  const onCopy = async () => {
    const text = getText();
    if (!text) return toast.error("No text to copy!");
    await navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  const onSave = async () => {
    const text = getText();
    if (!text) return toast.error("No text to save!");
    toast.promise(
      mutateAsync({
        title: "Untitled",
        content: text,
      }),
      {
        loading: "Saving note...",
        success: () => "Note saved!",
        error: "Failed to save note",
      }
    );
  };

  return (
    <Actions className="mt-2 !text-base">
      <Action
        className="!h-auto !w-auto !bg-muted !rounded-full cursor-pointer"
        title="Copy"
        onClick={onCopy}
      >
        <CopyIcon className="size-4" />
        <span>Copy</span>
      </Action>
      <Action
        className="!h-auto !w-auto !bg-muted !rounded-full cursor-pointer"
        title="Save as note"
        onClick={onSave}
      >
        <ArrowBigDownIcon className="size-4" />
        <span>Save as note</span>
      </Action>
    </Actions>
  );
});

MessageAction.displayName = "MessageAction";

export default MessageAction;
