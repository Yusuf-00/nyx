"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/hooks/useAuth";

export default function DashboardPage() {
  const router = useRouter();
  const { logout, session } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background px-6 py-8 text-text">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded border border-border bg-surface p-6">
          <header className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-text-muted">
                nyx
              </p>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
            </div>
            <button
              className="rounded border border-border px-4 py-2 text-sm text-text transition-colors hover:border-accent hover:text-accent"
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </header>
          <section className="rounded border border-border bg-background p-4 text-sm text-text-muted">
            Signed in as {session?.username ?? "demo"}
          </section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
