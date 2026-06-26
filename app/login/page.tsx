import { Card } from "@/components/UI/Card";
import { Button } from "@/components/UI/Button";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <Card className="w-full">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Authentication wiring is ready for Supabase credentials.</p>
        <div className="mt-6 grid gap-3">
          <Button>Continue with Google</Button>
          <Button variant="secondary">Continue with Email</Button>
        </div>
      </Card>
    </main>
  );
}
