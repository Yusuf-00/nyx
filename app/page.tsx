"use client";

import { useEffect } from "react";
import { useMarketData } from "@/lib/hooks/useMarketData";

export default function Home() {
  const { data, isLoading, isError, isFetching } = useMarketData();

  useEffect(() => {
    if (!data) {
      return;
    }

    console.log("[nyx] useMarketData result:", {
      count: data.length,
      sample: data.slice(0, 3),
    });
  }, [data]);

  return (
    <main className="min-h-screen bg-background p-6 text-text">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded border border-border bg-surface p-6">
        <h1 className="text-2xl font-semibold">nyx phase 2 test</h1>
        <p className="text-sm text-text-muted">
          This page uses useMarketData to validate TanStack Query integration.
        </p>
        <p className="text-sm">
          Status: {isLoading ? "Loading" : isError ? "Error" : "Success"}
        </p>
        <p className="text-sm">Fetching: {isFetching ? "Yes" : "No"}</p>
        <p className="text-sm">Assets: {data?.length ?? 0}</p>
      </section>
    </main>
  );
}
