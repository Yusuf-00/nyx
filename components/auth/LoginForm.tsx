"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isAuthenticated = login(username, password);

    if (!isAuthenticated) {
      setError("Invalid credentials.");
      return;
    }

    setError(null);
    router.replace("/dashboard");
  };

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2 text-sm text-text-muted">
        username
        <input
          className="rounded border border-border bg-background px-3 py-2 text-text outline-none transition-colors placeholder:text-text-muted/60 focus:border-accent"
          name="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-text-muted">
        password
        <input
          className="rounded border border-border bg-background px-3 py-2 text-text outline-none transition-colors placeholder:text-text-muted/60 focus:border-accent"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {error ? <p className="text-sm text-loss">{error}</p> : null}
      <button
        className="rounded border border-border bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-colors hover:opacity-90"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
}
