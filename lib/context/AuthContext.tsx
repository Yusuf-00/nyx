"use client";

import { createContext, useCallback, useEffect, useState } from "react";

const AUTH_STORAGE_KEY = "nyx-auth-session";

interface AuthSession {
  username: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  isHydrated: boolean;
  session: AuthSession | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readStoredSession = (): AuthSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (
      typeof parsedValue === "object" &&
      parsedValue !== null &&
      "username" in parsedValue &&
      typeof (parsedValue as { username: unknown }).username === "string"
    ) {
      return { username: (parsedValue as { username: string }).username };
    }
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return null;
};

export function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, setSession] = useState<AuthSession | null>(
    () => readStoredSession(),
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydrateTimer = window.setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    return () => {
      window.clearTimeout(hydrateTimer);
    };
  }, []);

  const login = useCallback((username: string, password: string) => {
    if (username !== "demo" || password !== "demo123") {
      return false;
    }

    const nextSession: AuthSession = { username };
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);

    return true;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: session !== null,
        isHydrated,
        session,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
