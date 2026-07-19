import LoginForm from "@/components/auth/LoginForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NyxFooter from "@/components/ui/NyxFooter";
import NyxLockup from "@/components/ui/NyxLockup";

export default function LoginPage() {
  return (
    <ProtectedRoute mode="guest">
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-text">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex flex-col items-center">
            <NyxLockup centered showTagline />
          </div>
          <section className="w-full rounded border border-border bg-surface p-8 shadow-sm shadow-black/20">
            <LoginForm />
          </section>
          <NyxFooter className="mt-8 text-center" />
        </div>
      </main>
    </ProtectedRoute>
  );
}
