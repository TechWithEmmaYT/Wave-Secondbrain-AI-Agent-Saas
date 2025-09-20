-- CreateEnum
CREATE TYPE "public"."Plan" AS ENUM ('free', 'plus', 'premium');

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "stripeCustomerId" TEXT;

-- CreateTable
CREATE TABLE "public"."subscriptions" (
    "id" TEXT NOT NULL,
    "plan" "public"."Plan" NOT NULL DEFAULT 'free',
    "referenceId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "status" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3),
    "periodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN DEFAULT false,
    "seats" INTEGER,
    "trialStart" TIMESTAMP(3),
    "trialEnd" TIMESTAMP(3),

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_referenceId_fkey" FOREIGN KEY ("referenceId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
