import LoginForm from "@/components/auth/LoginForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function LoginPage() {
  return (
    <ProtectedRoute mode="guest">
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-text">
        <section className="w-full max-w-sm rounded border border-border bg-surface p-6 shadow-sm shadow-black/20">
          <div className="mb-6 space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-text-muted">
              nyx
            </p>
            <h1 className="text-2xl font-semibold">Sign in</h1>
            <p className="text-sm text-text-muted">
              Use the demo credentials to access the dashboard.
            </p>
          </div>
          <LoginForm />
        </section>
      </main>
    </ProtectedRoute>
  );
}
