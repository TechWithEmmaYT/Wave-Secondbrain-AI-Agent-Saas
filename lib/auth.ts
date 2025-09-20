import { betterAuth } from "better-auth";
import { openAPI, bearer } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { stripe } from "@better-auth/stripe";
import { PrismaClient } from "@/generated/prisma";
import { stripeClient } from "./stripe";
import { PLANS } from "./constant";
import { createDefaultSubscription } from "@/app/actions/action";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
  },
  plugins: [
    openAPI(),
    bearer(),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      onCustomerCreate: async ({ stripeCustomer, user }) => {
        const userId = user.id;
        const stripeCustomerId = stripeCustomer.id;
        await createDefaultSubscription(userId, stripeCustomerId);
      },
      subscription: {
        enabled: true,
        plans: PLANS,
      },
    }),
  ],
});
