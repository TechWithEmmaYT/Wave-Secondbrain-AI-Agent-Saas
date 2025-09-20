import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PaidPlanEnumType,
  PLAN_ENUM,
  PlanEnumType,
  PLANS,
  UPGRADEABLE_PLANS,
} from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Check, Loader } from "lucide-react";

interface Props {
  plan: (typeof PLANS)[number];
  subscription?: {
    isAllowed: boolean;
    hasPaidSubscription: boolean;
    plan: PlanEnumType;
    generationsUsed: number;
    generationsLimit: number | null;
    remainingGenerations: string | number;
  };
  loading: boolean;
  error: string | null;
  isUpgrading: boolean;
  onUpgrade: (plan: PaidPlanEnumType) => void;
}

const PlanCard = React.memo(
  ({ plan, subscription, loading, error, isUpgrading, onUpgrade }: Props) => {
    const isPopular = plan.name === PLAN_ENUM.PREMIUM;
    const isCurrent = subscription?.plan === plan.name;
    const action = subscription?.hasPaidSubscription
      ? "Switch plan"
      : "Upgrade";

    const generationsUsed = isCurrent ? subscription?.generationsUsed ?? 0 : 0;

    const generationsLimit = isCurrent ? subscription?.generationsLimit : null;

    const remainingGenerations = isCurrent
      ? subscription?.remainingGenerations
      : null;

    const percentUsed =
      generationsLimit && generationsLimit > 0
        ? Math.min((generationsUsed / generationsLimit) * 100, 100)
        : 0;

    return (
      <div className="flex flex-col p-6 border-l">
        <div className="flex-1">
          <div className="flex items-center justify-start gap-2 mb-2">
            <h3 className="capitalize text-lg lg:text-xl font-semibold">
              {plan?.name?.toLowerCase()}
            </h3>

            {isPopular && !isCurrent && (
              <Badge className="bg-primary/10 text-primary text-xs">
                Popular
              </Badge>
            )}

            {isCurrent && (
              <Badge className="bg-gray-200 text-gray-700 text-xs">
                Current
              </Badge>
            )}
          </div>

          <div className="mb-4">
            <div className="text-base font-normal">
              ${plan.price}
              <span className="text-sm text-muted-foreground ml-1">
                per month billed
              </span>
            </div>
          </div>

          {isCurrent && (
            <div className="mb-4 text-sm text-muted-foreground">
              {generationsLimit === null ? (
                "Unlimited generations"
              ) : (
                <>
                  {remainingGenerations} / {generationsLimit} generations left
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-2 bg-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${percentUsed}` }}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <Skeleton className="h-6 w-28 rounded-md" />
        ) : error ? (
          <div className="text-sm text-destructive">{error}</div>
        ) : isCurrent && plan.name !== PLAN_ENUM.FREE ? (
          <Button variant="outline">Manage</Button>
        ) : UPGRADEABLE_PLANS.includes(plan.name as PaidPlanEnumType) ? (
          <Button
            variant={isPopular ? "default" : "outline"}
            className={cn(
              "cursor-pointer",
              isPopular && "bg-primary hover:opacity-80 text-white"
            )}
            disabled={isUpgrading}
            onClick={() => onUpgrade(plan.name as PaidPlanEnumType)}
          >
            {isUpgrading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <>{action}</>
            )}
          </Button>
        ) : null}
      </div>
    );
  }
);

PlanCard.displayName = "PlanCard";

export default PlanCard;

export const FeatureRow = React.memo(({ features }: { features: string[] }) => {
  return (
    <div className="p-6 space-y-3">
      {features?.map((feature, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <Check className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
});

FeatureRow.displayName = "FeatureRow";
