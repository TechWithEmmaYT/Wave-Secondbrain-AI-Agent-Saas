import ChatInterface from "@/components/chat";
import { generateUUID } from "@/lib/utils";
import Header from "../_common/header";

export default async function Chat() {
  const id = generateUUID();
  return (
    <>
      <Header showActions />
      <div className="relative w-full">
        <ChatInterface
          key={id}
          chatId={id}
          initialMessages={[]}
          initialLoading={false}
          onlyInput={false}
        />
      </div>
    </>
  );
}
