import type { SubscriptionPlan } from "@/types/subscription";

export const PAYMENT_CONFIG = {
  upiId: process.env.NEXT_PUBLIC_PAYMENT_UPI_ID ?? process.env.UPI_ID ?? "nirbhay.learnearngo@okaxis",
  accountName: process.env.NEXT_PUBLIC_PAYMENT_ACCOUNT_NAME ?? process.env.PAYMENT_ACCOUNT_NAME ?? "Nirbhay Mishra",
  qrPath: process.env.NEXT_PUBLIC_PAYMENT_QR_PATH ?? process.env.PAYMENT_QR_PATH ?? "/payment/qr.png",
  monthlyAmount: Number(process.env.NEXT_PUBLIC_PAYMENT_MONTHLY_AMOUNT ?? process.env.PAYMENT_MONTHLY_AMOUNT ?? "299"),
  yearlyAmount: Number(process.env.NEXT_PUBLIC_PAYMENT_YEARLY_AMOUNT ?? process.env.PAYMENT_YEARLY_AMOUNT ?? "1999")
} as const;

export function getPlanAmount(plan: SubscriptionPlan): number {
  if (plan === "YEARLY") return PAYMENT_CONFIG.yearlyAmount;
  if (plan === "MONTHLY") return PAYMENT_CONFIG.monthlyAmount;
  return 0;
}

export function buildUpiDeepLink(plan: SubscriptionPlan): string {
  const params = new URLSearchParams({
    pa: PAYMENT_CONFIG.upiId,
    pn: PAYMENT_CONFIG.accountName,
    cu: "INR"
  });
  const amount = getPlanAmount(plan);
  if (amount > 0) params.set("am", String(amount));

  return `upi://pay?${params.toString()}`;
}
