"use client";

import { Check, Globe, Zap } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
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

function TrustBadge({
  indicator,
  label,
}: {
  indicator: TrustIndicator;
  label: string;
}) {
  const Icon = iconMap[indicator.icon];

  return (
    <li className="flex items-center gap-2 text-sm text-muted-foreground">
      <span
        className="
          relative flex size-6 items-center justify-center
          overflow-hidden rounded-full
          bg-linear-to-br from-[#6C4FF6]/12 via-[#8A6BFA]/8 to-[#31B86B]/14
          ring-1 ring-[#8A6BFA]/10
        "
      >
        <Icon
          aria-hidden="true"
          className="size-3.5 text-[#6C4FF6]/75"
        />
      </span>

      <span>{label}</span>
    </li>
  );
}

export function HeroTrustBadges({
  className,
}: HeroTrustBadgesProps) {
  const { messages } = useLanguage();

  const labels = [
    messages.Trust.verifiedCoupons,
    messages.Trust.updatedDaily,
    messages.Trust.globalStores,
  ];

  return (
    <ul
      className={cn(
        "flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3",
        className,
      )}
    >
      {trustIndicators.map((indicator, index) => (
        <TrustBadge
          key={indicator.label}
          indicator={indicator}
          label={labels[index]}
        />
      ))}
    </ul>
  );
}