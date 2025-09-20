/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkGenerationLimit } from "@/app/actions/action";
import { auth } from "@/lib/auth";
import { PLAN_ENUM } from "@/lib/constant";
import { getAuthUser } from "@/lib/hono/hono-middlware";
import prisma from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

const upgradeSchema = z.object({
  plan: z.enum([PLAN_ENUM.PLUS, PLAN_ENUM.PREMIUM]),
  callbackUrl: z.string().min(1),
});

export const subscriptionRoute = new Hono()
  .post(
    "/upgrade",
    zValidator("json", upgradeSchema),
    getAuthUser,
    async (c) => {
      try {
        const body = c.req.valid("json");
        const user = c.get("user");

        const existingSubscription = await prisma.subscription.findFirst({
          where: {
            referenceId: user.id,
            status: "active",
          },
        });
        if (existingSubscription?.plan === body.plan) {
          throw new HTTPException(400, {
            message: `You are already on the ${body.plan} plan`,
          });
        }

        const data = await auth.api.upgradeSubscription({
          body: {
            plan: body.plan,
            successUrl: `${body.callbackUrl}?success=true`,
            cancelUrl: `${body.callbackUrl}?error=true`,
            disableRedirect: true,
            ...(existingSubscription?.status === "active" &&
            existingSubscription.stripeSubscriptionId
              ? { subscriptionId: existingSubscription.stripeSubscriptionId }
              : {}),
          },
          headers: c.req.raw.headers,
        });

        return c.json({
          success: true,
          checkoutUrl: data.url,
        });
      } catch (error: any) {
        console.log(error);
        if (error instanceof HTTPException) {
          throw error;
        }
        throw new HTTPException(500, {
          message: "Failed to create checkout session, please try again..",
        });
      }
    }
  )
  .get("/generations", getAuthUser, async (c) => {
    try {
      const user = c.get("user");
      const data = await checkGenerationLimit(user.id);
      return c.json({
        succes: true,
        data,
      });
    } catch (error) {
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, {
        message: "Failed to retrieve generations data.",
      });
    }
  });
