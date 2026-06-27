import type { SubscriptionPlan } from "@/types/subscription";
import { getPlanAmount } from "@/config/payment";

export const PRICING = [
  { plan: "FREE" as SubscriptionPlan, price: "Free", features: ["4 anonymous messages", "10 logged-in messages", "Basic chat experience"] },
  { plan: "MONTHLY" as SubscriptionPlan, price: `₹${getPlanAmount("MONTHLY")}/mo`, features: ["Unlimited chat", "Memory support", "Priority access"] },
  { plan: "YEARLY" as SubscriptionPlan, price: `₹${getPlanAmount("YEARLY").toLocaleString("en-IN")}/yr`, features: ["Best value", "Unlimited chat", "Memory support"] }
];
