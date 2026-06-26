import type { SubscriptionPlan } from "@/types/subscription";

export const PRICING = [
  { plan: "FREE" as SubscriptionPlan, price: "Free", features: ["4 anonymous messages", "10 logged-in messages", "Basic chat experience"] },
  { plan: "MONTHLY" as SubscriptionPlan, price: "₹199/mo", features: ["Unlimited chat", "Memory support", "Priority access"] },
  { plan: "YEARLY" as SubscriptionPlan, price: "₹1,999/yr", features: ["Best value", "Unlimited chat", "Memory support"] }
];
