export type TrendingStore = {
  name: string;
  slug: string;
  initials: string;
};

export type TrustIndicator = {
  label: string;
  icon: "check" | "zap" | "globe";
};

export const trendingStores: TrendingStore[] = [
  { name: "Amazon", slug: "amazon", initials: "A" },
  { name: "Nike", slug: "nike", initials: "N" },
  { name: "Booking", slug: "booking", initials: "B" },
  { name: "Temu", slug: "temu", initials: "T" },
  { name: "AliExpress", slug: "aliexpress", initials: "AE" },
  { name: "Steam", slug: "steam", initials: "S" },
];

export const trustIndicators: TrustIndicator[] = [
  { label: "Verified Coupons", icon: "check" },
  { label: "Updated Daily", icon: "zap" },
  { label: "Global Stores", icon: "globe" },
];
