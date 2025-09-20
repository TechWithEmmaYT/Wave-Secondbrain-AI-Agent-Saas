import { api } from "@/lib/hono/hono-rpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestUpgradeSubscriptionType = InferRequestType<
  typeof api.subscription.upgrade.$post
>["json"];

type ResponseUpgradeSubscriptionType = InferResponseType<
  typeof api.subscription.upgrade.$post
>;

export const useUpgradeSubscription = () => {
  return useMutation<
    ResponseUpgradeSubscriptionType,
    Error,
    RequestUpgradeSubscriptionType
  >({
    mutationFn: async (json) => {
      const response = await api.subscription.upgrade.$post({ json });
      return await response.json();
    },
    onSuccess: (data) => {
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to upgrade subscription");
    },
  });
};

export const useCheckGenerations = () => {
  return useQuery({
    queryKey: ["generations"],
    queryFn: async () => {
      const response = await api.subscription.generations.$get();
      if (!response.ok) throw new Error("Failed to fetch generation");
      const { data } = await response.json();
      return data;
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
