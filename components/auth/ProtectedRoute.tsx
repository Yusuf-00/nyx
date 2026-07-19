"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

type ProtectedRouteMode = "protect" | "guest";

interface ProtectedRouteProps {
  children: React.ReactNode;
  mode?: ProtectedRouteMode;
}

const LoadingState = () => (
  <div className="flex min-h-screen items-center justify-center bg-background px-6 text-text">
    <p className="rounded border border-border bg-surface px-4 py-2 text-sm text-text-muted">
      Loading nyx session...
    </p>
  </div>
);

export default function ProtectedRoute({
  children,
  mode = "protect",
}: Readonly<ProtectedRouteProps>) {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuth();

  const shouldRedirectToLogin = mode === "protect" && !isAuthenticated;
  const shouldRedirectToDashboard = mode === "guest" && isAuthenticated;

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (shouldRedirectToLogin) {
      router.replace("/login");
    }

    if (shouldRedirectToDashboard) {
      router.replace("/dashboard");
    }
  }, [isHydrated, router, shouldRedirectToDashboard, shouldRedirectToLogin]);

  if (!isHydrated || shouldRedirectToLogin || shouldRedirectToDashboard) {
    return <LoadingState />;
  }

  return children;
}
