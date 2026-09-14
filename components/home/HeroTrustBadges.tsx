import { Check, Globe, Zap } from "lucide-react";

import { trustIndicators } from "@/constants/home";
import type { TrustIndicator } from "@/constants/home";
import { cn } from "@/lib/utils";

const iconMap = {
  check: Check,
  zap: Zap,
  globe: Globe,
} as const;

type HeroTrustBadgesProps = {
  className?: string;
};

function TrustBadge({ indicator }: { indicator: TrustIndicator }) {
  const Icon = iconMap[indicator.icon];

  return (
    <li className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="flex size-6 items-center justify-center rounded-full bg-muted/80">
        <Icon aria-hidden="true" className="size-3.5 text-foreground/70" />
      </span>
      <span>{indicator.label}</span>
    </li>
  );
}

export function HeroTrustBadges({ className }: HeroTrustBadgesProps) {
  return (
    <ul
      className={cn(
        "flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3",
        className
      )}
    >
      {trustIndicators.map((indicator) => (
        <TrustBadge key={indicator.label} indicator={indicator} />
      ))}
    </ul>
  );
}
