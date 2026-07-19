"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AssetDetailsPanel from "@/components/market/AssetDetailsPanel";
import MarketTable from "@/components/market/MarketTable";
import RefreshButton from "@/components/market/RefreshButton";
import SearchFilter from "@/components/market/SearchFilter";
import TableStates from "@/components/market/TableStates";
import NyxFooter from "@/components/ui/NyxFooter";
import NyxLockup from "@/components/ui/NyxLockup";
import { useMarketData } from "@/lib/hooks/useMarketData";
import { useAuth } from "@/lib/hooks/useAuth";
import type { Asset } from "@/lib/types/market";

const PAGE_SIZE = 10;

export default function DashboardPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const { data, isError, isRefetchError, isFetching, isLoading, refetch } =
    useMarketData();
  const hasDataError = isError || isRefetchError;

  const handleRefresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [isTabletDetailsOpen, setIsTabletDetailsOpen] = useState(false);
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
    router.replace("/login");
  }, [logout, router]);

  const handleSearchChange = useCallback((nextSearchTerm: string) => {
    setSearchTerm(nextSearchTerm);
    setCurrentPage(1);
  }, []);

  const handleSelectAsset = useCallback((assetId: string) => {
    setSelectedAssetId(assetId);

    if (typeof window === "undefined") {
      return;
    }

    if (window.innerWidth < 768) {
      setIsMobileDetailsOpen(true);
      return;
    }

    if (window.innerWidth < 1024) {
      setIsTabletDetailsOpen(true);
    }
  }, []);

  const handleCloseMobileDetails = useCallback(() => {
    setIsMobileDetailsOpen(false);
  }, []);

  const handleToggleTabletDetails = useCallback(() => {
    setIsTabletDetailsOpen((previousValue) => !previousValue);
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

  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / PAGE_SIZE));
  const effectivePage = Math.min(currentPage, totalPages);

  const paginatedAssets = useMemo(() => {
    const start = (effectivePage - 1) * PAGE_SIZE;
    return filteredAssets.slice(start, start + PAGE_SIZE);
  }, [filteredAssets, effectivePage]);

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

    return (data ?? []).find((asset) => asset.id === selectedAssetId) ?? null;
  }, [data, selectedAssetId]);

  const selectedAssetDetails = useMemo(() => {
    if (!selectedAsset) {
      return null;
    }

    return {
      id: selectedAsset.id,
      name: selectedAsset.name,
      symbol: selectedAsset.symbol,
      currentPrice: selectedAsset.currentPrice,
      high24h: selectedAsset.high24h,
      low24h: selectedAsset.low24h,
      totalVolume: selectedAsset.totalVolume,
      lastUpdated: selectedAsset.lastUpdated,
    };
  }, [selectedAsset]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col overflow-hidden bg-background text-text">
        {/* Sticky header */}
        <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-surface px-4 md:px-8">
          <NyxLockup compact />
          <button
            aria-label="Log out"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-border text-text transition-colors hover:border-accent hover:text-accent"
            type="button"
            onClick={handleLogout}
            title="Log out"
          >
            <LogOut size={15} aria-hidden="true" />
          </button>
        </header>

        {/* Main content */}
        <main className="flex-1 min-h-0 overflow-y-auto px-4 py-6 md:px-8">
          <div className="mx-auto max-w-screen-2xl">
            {/* Toolbar: search + refresh */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:max-w-xs">
                <SearchFilter onSearchChange={handleSearchChange} />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.24em] text-text-muted">
                  {filteredAssets.length} of {(data ?? []).length} assets
                </span>
                {isFetching ? (
                  <span className="text-xs uppercase tracking-[0.24em] text-text-muted">
                    refreshing...
                  </span>
                ) : null}
                <RefreshButton onRefresh={handleRefresh} isFetching={isFetching} />
              </div>
            </div>

            {/* Content: table (left) + details panel (right) */}
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
              <div className="flex min-w-0 flex-col gap-3">
                {isLoading ? <TableStates.Loading /> : null}

                {hasDataError ? <TableStates.Error onRetry={handleRefresh} /> : null}

                {!isLoading && !hasDataError && filteredAssets.length > 0 ? (
                  <>
                    <MarketTable
                      assets={paginatedAssets}
                      selectedAssetId={selectedAssetId}
                      onSelectAsset={handleSelectAsset}
                    />

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-1">
                      <p className="text-xs text-text-muted">
                        page {effectivePage} of {totalPages}
                      </p>
                      <nav aria-label="Table pagination" className="flex items-center gap-1">
                        <button
                          aria-label="Previous page"
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-border text-text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={effectivePage === 1}
                          type="button"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        >
                          <ChevronLeft size={14} aria-hidden="true" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            aria-current={page === effectivePage ? "page" : undefined}
                            aria-label={`Page ${page}`}
                            className={[
                              "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded border text-xs transition-colors",
                              page === effectivePage
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border text-text-muted hover:border-accent hover:text-accent",
                            ].join(" ")}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          aria-label="Next page"
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-border text-text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                          disabled={effectivePage === totalPages}
                          type="button"
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        >
                          <ChevronRight size={14} aria-hidden="true" />
                        </button>
                      </nav>
                    </div>
                  </>
                ) : null}

                {!isLoading && !hasDataError && filteredAssets.length === 0 ? (
                  <TableStates.Empty />
                ) : null}
              </div>

              {!isLoading && !hasDataError ? (
                <AssetDetailsPanel
                  asset={selectedAssetDetails}
                  isTabletOpen={isTabletDetailsOpen}
                  onToggleTablet={handleToggleTabletDetails}
                  isMobileOpen={isMobileDetailsOpen}
                  onCloseMobile={handleCloseMobileDetails}
                />
              ) : null}
            </div>
          </div>
        </main>

        <NyxFooter className="flex-none border-t border-border px-4 py-4 md:px-8" />
      </div>
    </ProtectedRoute>
  );
}
