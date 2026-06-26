export type SubscriptionPlan = "FREE" | "MONTHLY" | "YEARLY";
export type SubscriptionStatus = "ACTIVE" | "PENDING" | "EXPIRED" | "CANCELLED";

export interface SubscriptionRecord {
  id: string;
  profileId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate?: string;
  endDate?: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
}
