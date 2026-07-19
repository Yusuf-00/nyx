"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MarketTable from "@/components/market/MarketTable";
import SearchFilter from "@/components/market/SearchFilter";
import { useMarketData } from "@/lib/hooks/useMarketData";
import { useAuth } from "@/lib/hooks/useAuth";
import type { Asset } from "@/lib/types/market";

export default function DashboardPage() {
  const router = useRouter();
  const { logout, session } = useAuth();
  const { data, isError, isFetching, isLoading, refetch } = useMarketData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const handleLogout = useCallback(() => {
    logout();
    router.replace("/login");
  }, [logout, router]);

  const handleSearchChange = useCallback((nextSearchTerm: string) => {
    setSearchTerm(nextSearchTerm);
  }, []);

  const handleSelectAsset = useCallback((assetId: string) => {
    setSelectedAssetId(assetId);
  }, []);

  const filteredAssets = useMemo(() => {
    const assets = data ?? [];
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return assets;
    }

    return assets.filter((asset) => {
      return (
        asset.name.toLowerCase().includes(normalizedSearchTerm) ||
        asset.symbol.toLowerCase().includes(normalizedSearchTerm)
      );
    });
  }, [data, searchTerm]);

  useEffect(() => {
    if (selectedAssetId || filteredAssets.length === 0) {
      return;
    }

    const initialSelectionTimer = window.setTimeout(() => {
      setSelectedAssetId(filteredAssets[0].id);
    }, 0);

    return () => {
      window.clearTimeout(initialSelectionTimer);
    };
  }, [filteredAssets, selectedAssetId]);

  const selectedAsset = useMemo<Asset | null>(() => {
    if (!selectedAssetId) {
      return null;
    }

    return filteredAssets.find((asset) => asset.id === selectedAssetId) ?? null;
  }, [filteredAssets, selectedAssetId]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-background px-4 py-6 text-text md:px-6 md:py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <div className="flex flex-col gap-2 rounded border border-border bg-surface p-5 md:p-6">
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

          <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
            <div className="rounded border border-border bg-surface p-5">
              <SearchFilter onSearchChange={handleSearchChange} />
              <div className="mt-3 text-xs uppercase tracking-[0.24em] text-text-muted">
                {filteredAssets.length} of {(data ?? []).length} assets
              </div>
              <div className="mt-2 text-sm text-text-muted">
                {selectedAsset
                  ? `Selected: ${selectedAsset.name} (${selectedAsset.symbol.toUpperCase()})`
                  : "Choose an asset from the table."}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {isLoading ? (
                <div className="rounded border border-border bg-surface p-5 text-sm text-text-muted">
                  Loading market data...
                </div>
              ) : null}

              {isError ? (
                <div className="rounded border border-border bg-surface p-5 text-sm text-loss">
                  <p>Unable to load market data.</p>
                  <button
                    className="mt-3 rounded border border-border px-3 py-2 text-sm text-text transition-colors hover:border-accent hover:text-accent"
                    type="button"
                    onClick={() => refetch()}
                  >
                    Retry
                  </button>
                </div>
              ) : null}

              {!isLoading && !isError ? (
                <MarketTable
                  assets={filteredAssets}
                  selectedAssetId={selectedAssetId}
                  onSelectAsset={handleSelectAsset}
                />
              ) : null}

              {isFetching ? (
                <p className="text-xs uppercase tracking-[0.28em] text-text-muted">
                  Refreshing market data...
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
