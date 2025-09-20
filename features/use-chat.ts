import { api } from "@/lib/hono/hono-rpc";
import { useQuery } from "@tanstack/react-query";

export const useChatById = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["chat", id],
    queryFn: async () => {
      const response = await api.chat[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chat");
      }
      const { data } = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data as any;
    },
    enabled: enabled,
  });
};

export const useChats = () => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await api.chat.$get();
      if (!response.ok) throw new Error("Failed to fetch chat");
      const { data } = await response.json();
      return data;
    },
  });
};
