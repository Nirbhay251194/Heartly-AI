"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { Copy, QrCode, Smartphone, Upload } from "lucide-react";
import { Card } from "@/components/UI/Card";
import { Button, buttonClassName } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Textarea } from "@/components/UI/Textarea";
import { PAYMENT_CONFIG, buildUpiDeepLink } from "@/config/payment";
import { PRICING } from "@/config/pricing";
import { getSupabaseClient } from "@/services/supabase";
import type { SubscriptionPlan } from "@/types/subscription";

interface PaymentResponse {
  success: boolean;
  message?: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [plan, setPlan] = useState<SubscriptionPlan>("MONTHLY");
  const [transactionId, setTransactionId] = useState("");
  const [screenshotDataUrl, setScreenshotDataUrl] = useState("");
  const [screenshotName, setScreenshotName] = useState("");
  const [note, setNote] = useState("");
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const selectedPlan = new URLSearchParams(window.location.search).get("plan");
    if (selectedPlan === "MONTHLY" || selectedPlan === "YEARLY") {
      setPlan(selectedPlan);
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      router.replace("/login?redirectTo=/payment");
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace(`/login?redirectTo=${encodeURIComponent(`/payment?plan=${plan}`)}` as Route);
      }
    });
  }, [plan, router, supabase]);

  async function copyUpiId() {
    await navigator.clipboard.writeText(PAYMENT_CONFIG.upiId);
    setNotice("UPI ID copied to clipboard.");
  }

  function handleScreenshotChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setScreenshotDataUrl("");
      setScreenshotName("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotDataUrl(typeof reader.result === "string" ? reader.result : "");
      setScreenshotName(file.name);
    };
    reader.readAsDataURL(file);
  }

  async function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setIsLoading(true);
    setNotice("");

    const client = supabase;
    const { data } = await client.auth.getSession();
    if (!data.session) {
      router.replace(`/login?redirectTo=${encodeURIComponent(`/payment?plan=${plan}`)}` as Route);
      setIsLoading(false);
      return;
    }

    if (!transactionId.trim() && !screenshotDataUrl.trim()) {
      setNotice("Add at least a UTR number or a screenshot.");
      setIsLoading(false);
      return;
    }

    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.session.access_token}`
      },
      body: JSON.stringify({
        plan,
        transactionId: transactionId.trim(),
        utrNumber: transactionId.trim(),
        screenshotUrl: screenshotDataUrl.trim(),
        note: note.trim()
      })
    });

    const payload = (await response.json()) as PaymentResponse;
    setIsLoading(false);

    if (!response.ok || !payload.success) {
      setNotice(payload.message ?? "Could not submit payment request.");
      return;
    }

    setNotice("Payment request submitted. Your premium plan will activate after admin approval.");
  }

  const selected = PRICING.find((item) => item.plan === plan);
  const upiDeepLink = buildUpiDeepLink(plan);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="overflow-hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-600">Manual payment</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Complete payment by UPI</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Pay with your preferred UPI app, then submit either a UTR number or a screenshot for admin approval.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {PRICING.filter((item) => item.plan !== "FREE").map((item) => (
              <button
                key={item.plan}
                type="button"
                onClick={() => setPlan(item.plan)}
                className={`rounded-[22px] border p-4 text-left transition ${
                  plan === item.plan
                    ? "border-pink-500 bg-pink-500/5 shadow-sm"
                    : "border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/60"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600 dark:text-pink-300">{item.plan}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{item.price}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.plan === "MONTHLY" ? "Best for flexible continuity." : "Best value for uninterrupted access."}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] bg-slate-950 p-5 text-white shadow-xl shadow-slate-950/10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <QrCode className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{PAYMENT_CONFIG.accountName}</p>
                <p className="text-xs text-slate-300">UPI payment and verification details</p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-[160px_1fr] sm:items-center">
              <div className="overflow-hidden rounded-[20px] bg-white p-3">
                <Image src={PAYMENT_CONFIG.qrPath} alt="UPI payment QR code" width={160} height={160} className="h-auto w-full" priority />
              </div>
              <div className="space-y-3">
                <div className="rounded-[18px] bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-300">UPI ID</p>
                  <p className="mt-2 break-all text-lg font-semibold text-white">{PAYMENT_CONFIG.upiId}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="button" variant="secondary" className="bg-white text-slate-950 hover:bg-slate-100" onClick={copyUpiId}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy UPI
                  </Button>
                  <a href={upiDeepLink} className={buttonClassName("primary", "bg-pink-500 text-white")}>
                    <Smartphone className="mr-2 h-4 w-4" />
                    Open UPI App
                  </a>
                </div>
                <p className="text-sm leading-6 text-slate-300">
                  After paying, return here and submit the reference. Your request stays pending until an admin approves it.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Plan Summary</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{selected?.price ?? "Premium"}</p>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {selected?.features[0] ?? "Unlimited conversations with premium access."}
            </p>
          </div>
        </Card>

        <Card>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-600">Submit proof</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Upload screenshot or add UTR</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            At least one proof is required. You can also add an optional note if you want to help with manual verification.
          </p>

          <form onSubmit={submitPayment} className="mt-6 grid gap-4">
            <Input value={transactionId} onChange={(event) => setTransactionId(event.target.value)} placeholder="UTR / transaction number (optional)" />
            <Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Optional note for the admin" />
            <label className="flex cursor-pointer flex-col gap-3 rounded-[24px] border border-dashed border-slate-300 bg-white/80 p-4 text-sm text-slate-600 transition hover:border-pink-400 hover:bg-pink-50/60 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:bg-pink-950/20">
              <span className="flex items-center gap-2 font-medium text-slate-950 dark:text-white">
                <Upload className="h-4 w-4 text-pink-500" />
                Upload screenshot (optional)
              </span>
              <span>{screenshotName || "PNG, JPG, or HEIC image of the payment confirmation"}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleScreenshotChange} />
            </label>

            {screenshotDataUrl ? (
              <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60">
                <Image src={screenshotDataUrl} alt="Payment screenshot preview" width={1200} height={900} unoptimized className="h-auto w-full object-cover" />
              </div>
            ) : null}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : `Submit ${selected?.price ?? "payment request"}`}
            </Button>
          </form>

          {notice ? <p className="mt-5 rounded-[22px] bg-pink-50 px-4 py-3 text-sm text-pink-700 dark:bg-pink-950/30 dark:text-pink-200">{notice}</p> : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/pricing" className={buttonClassName("secondary")}>
              Back to Pricing
            </Link>
            <Link href="/chat" className={buttonClassName("ghost")}>
              Continue Chat
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
