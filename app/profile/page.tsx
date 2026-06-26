import { Card } from "@/components/UI/Card";

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Card>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Your profile, companion, language, and subscription preferences will appear here.</p>
      </Card>
    </main>
  );
}
