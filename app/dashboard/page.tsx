import { Card } from "@/components/UI/Card";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Card>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Approval queues and moderation tools will use Supabase-backed access controls.</p>
      </Card>
    </main>
  );
}
