"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2, LogOut, XCircle } from "lucide-react";
import { Card } from "@/components/UI/Card";
import { Button, buttonClassName } from "@/components/UI/Button";
import { getCompanionById } from "@/config/companions";
import { getSupabaseClient } from "@/services/supabase";
import type { AdminSnapshot, PaymentRequestRecord, PaymentStatus, ProfileRecord } from "@/types/database";

interface AdminResponse {
  success: boolean;
  message?: string;
  data?: AdminSnapshot;
}

interface AdminActionResponse {
  success: boolean;
  message?: string;
  data?: {
    paymentRequest: PaymentRequestRecord;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [sessionToken, setSessionToken] = useState("");
  const [snapshot, setSnapshot] = useState<AdminSnapshot | null>(null);
  const [notice, setNotice] = useState("");
  const [notesById, setNotesById] = useState<Record<string, string>>({});
  const [busyPaymentId, setBusyPaymentId] = useState("");

  useEffect(() => {
    if (!supabase) {
      router.replace("/login?redirectTo=/dashboard");
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login?redirectTo=/dashboard");
        return;
      }

      setSessionToken(data.session.access_token);
    });
  }, [router, supabase]);

  useEffect(() => {
    if (!sessionToken) return;

    loadDashboard(sessionToken).catch((error) => setNotice(error instanceof Error ? error.message : "Could not load dashboard."));
  }, [sessionToken]);

  async function loadDashboard(token: string) {
    const response = await fetch("/api/admin", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const payload = (await response.json()) as AdminResponse;

    if (!response.ok || !payload.success || !payload.data) {
      throw new Error(payload.message ?? "Could not load admin dashboard.");
    }

    setSnapshot(payload.data);
    setNotice("");
  }

  async function updatePaymentStatus(paymentRequestId: string, status: PaymentStatus) {
    if (!sessionToken) return;

    setBusyPaymentId(paymentRequestId);
    setNotice("");

    const response = await fetch("/api/admin", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`
      },
      body: JSON.stringify({
        paymentRequestId,
        status,
        notes: notesById[paymentRequestId]?.trim() || undefined
      })
    });

    const payload = (await response.json()) as AdminActionResponse;
    setBusyPaymentId("");

    if (!response.ok || !payload.success) {
      setNotice(payload.message ?? "Could not update payment request.");
      return;
    }

    await loadDashboard(sessionToken);
    setNotice(`Payment request ${status.toLowerCase()}.`);
  }

  async function logout() {
    await supabase?.auth.signOut();
    router.replace("/");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-600">Admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Usage, subscriptions, conversations, and payment approvals.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/chat" className={buttonClassName("secondary")}>
            Back to Chat
          </Link>
          <Button type="button" variant="ghost" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {notice ? <p className="mt-6 rounded-[22px] bg-pink-50 px-4 py-3 text-sm text-pink-700 dark:bg-pink-950/30 dark:text-pink-200">{notice}</p> : null}

      {!snapshot && !notice ? <p className="mt-8 text-sm text-slate-500">Loading dashboard...</p> : null}

      {snapshot ? (
        <>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Metric title="Profiles" value={snapshot.profiles.length} />
            <Metric title="Conversations" value={snapshot.conversations.length} />
            <Metric title="Payment Requests" value={snapshot.paymentRequests.length} />
            <Metric title="Estimated Tokens" value={snapshot.tokenUsage.estimatedTokens} />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Recent Profiles</h2>
              <div className="mt-4 space-y-3">
                {snapshot.profiles.slice(0, 6).map((profile) => (
                  <ProfileRow key={profile.id} profile={profile} />
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Recent Conversations</h2>
              <div className="mt-4 space-y-3">
                {snapshot.conversations.slice(0, 6).map((conversation) => {
                  const companion = getCompanionById(conversation.companion_id);
                  return (
                    <div key={conversation.id} className="flex items-center justify-between gap-3 rounded-[20px] bg-slate-950/[0.03] p-3 text-sm dark:bg-white/5">
                      <span className="min-w-0 truncate">{conversation.title}</span>
                      <span className="font-medium text-slate-600 dark:text-slate-300">{companion?.name ?? conversation.companion_id}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="mt-6 grid gap-4">
            <Card>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Payment Queue</h2>
              <div className="mt-4 space-y-4">
                {snapshot.paymentRequests.length === 0 ? (
                  <p className="text-sm text-slate-500">No payment requests yet.</p>
                ) : (
                  snapshot.paymentRequests.map((payment) => (
                    <div key={payment.id} className="rounded-[24px] border border-slate-200 p-4 dark:border-slate-800">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-950 dark:text-white">{payment.profiles?.email ?? payment.profile_id}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                            {payment.plan} {payment.amount}
                          </p>
                        </div>
                        <span className="rounded-full bg-slate-950/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:bg-white/10 dark:text-slate-300">
                          {payment.payment_status}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Detail label="UTR" value={payment.upi_transaction_id ?? payment.utr_number ?? "Not provided"} />
                        <Detail label="Amount" value={`₹${Number(payment.amount).toLocaleString("en-IN")}`} />
                      </div>

                      {payment.payment_screenshot_url || payment.screenshot_url ? (
                        <div className="mt-4 overflow-hidden rounded-[20px] border border-slate-200 dark:border-slate-800">
                          <Image
                            src={payment.payment_screenshot_url ?? payment.screenshot_url ?? ""}
                            alt="Payment screenshot"
                            width={1200}
                            height={900}
                            unoptimized
                            className="h-auto w-full object-cover"
                          />
                        </div>
                      ) : null}

                      <textarea
                        value={notesById[payment.id] ?? payment.admin_notes ?? ""}
                        onChange={(event) => setNotesById((current) => ({ ...current, [payment.id]: event.target.value }))}
                        placeholder="Admin notes"
                        className="mt-4 min-h-24 w-full rounded-[20px] border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 dark:border-slate-700 dark:bg-slate-950"
                      />

                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button
                          type="button"
                          variant="primary"
                          onClick={() => updatePaymentStatus(payment.id, "APPROVED")}
                          disabled={busyPaymentId === payment.id || payment.payment_status !== "PENDING"}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => updatePaymentStatus(payment.id, "REJECTED")}
                          disabled={busyPaymentId === payment.id || payment.payment_status !== "PENDING"}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </>
      ) : null}
    </main>
  );
}

function Metric({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{value.toLocaleString()}</p>
    </Card>
  );
}

function ProfileRow({ profile }: { profile: ProfileRecord }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[20px] bg-slate-950/[0.03] p-3 text-sm dark:bg-white/5">
      <span className="min-w-0 truncate">{profile.email}</span>
      <span className="font-medium text-slate-600 dark:text-slate-300">{profile.subscription_status}</span>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] bg-slate-950/[0.03] p-3 text-sm dark:bg-white/5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-1 break-all font-medium text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}
