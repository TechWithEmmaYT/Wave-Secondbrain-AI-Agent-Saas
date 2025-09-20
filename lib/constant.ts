export const PLAN_ENUM = {
  FREE: "free",
  PLUS: "plus",
  PREMIUM: "premium",
} as const;

export type PlanEnumType = (typeof PLAN_ENUM)[keyof typeof PLAN_ENUM];

export type PaidPlanEnumType = Exclude<PlanEnumType, "free">;

export const UPGRADEABLE_PLANS = [PLAN_ENUM.PLUS, PLAN_ENUM.PREMIUM];

const PLUS_PRICE_ID = process.env.STRIPE_PLUS_PLAN_ID!;
const PREMIUM_PRICE_ID = process.env.STRIPE_PREMIUM_PLAN_ID!;

export const PLANS = [
  {
    id: 1,
    name: PLAN_ENUM.FREE,
    price: 0,
    priceId: undefined,
    features: [
      "20 AI generations per month",
      "Basic support",
      "Limited notes creation",
      "Access to core features",
      "Community access",
      "Single user only",
    ],
    limits: {
      generations: 10,
    },
  },
  {
    id: 2,
    name: PLAN_ENUM.PLUS,
    price: 12,
    priceId: PLUS_PRICE_ID,
    features: [
      "300 AI generations per month",
      "Unlimited notes creation",
      "Priority support",
      "Access to all features",
      "AI Advanced search",
    ],
    limits: {
      generations: 300,
    },
  },
  {
    id: 3,
    name: PLAN_ENUM.PREMIUM,
    price: 24,
    priceId: PREMIUM_PRICE_ID,
    features: [
      "Unlimited AI generations",
      "Unlimited notes creation",
      "Priority support",
      "Early access to new features",
      "AI Advanced search",
      "Advanced admin & analytics",
      "Custom integrations & API access",
    ],
    limits: {
      generations: Infinity,
    },
  },
];
