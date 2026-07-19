import type { AssetDetails } from "@/lib/types/market";
import { X } from "lucide-react";
import {
  formatLastUpdatedTime,
  formatPrice,
  formatVolume,
} from "@/lib/utils/formatters";

interface AssetDetailsPanelProps {
  asset: AssetDetails | null;
  isTabletOpen: boolean;
  onToggleTablet: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

function DetailsContent({ asset }: Readonly<{ asset: AssetDetails | null }>) {
  if (!asset) {
    return (
      <p className="text-sm text-text-muted">
        Select an asset to view market details.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.24em] text-text-muted">
          {asset.symbol}
        </p>
        <h2 className="text-xl font-semibold text-text">{asset.name}</h2>
        <p className="font-mono text-lg text-text">{formatPrice(asset.currentPrice)}</p>
      </header>

      <dl className="grid grid-cols-1 gap-3 text-sm text-text-muted">
        <div className="flex items-center justify-between gap-3 rounded border border-border bg-background px-3 py-2">
          <dt>24h high</dt>
          <dd className="font-mono text-text">{formatPrice(asset.high24h)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded border border-border bg-background px-3 py-2">
          <dt>24h low</dt>
          <dd className="font-mono text-text">{formatPrice(asset.low24h)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded border border-border bg-background px-3 py-2">
          <dt>Volume</dt>
          <dd className="font-mono text-text">{formatVolume(asset.totalVolume)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded border border-border bg-background px-3 py-2">
          <dt>Last updated</dt>
          <dd className="font-mono text-text">{formatLastUpdatedTime(asset.lastUpdated)}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function AssetDetailsPanel({
  asset,
  isTabletOpen,
  onToggleTablet,
  isMobileOpen,
  onCloseMobile,
}: Readonly<AssetDetailsPanelProps>) {
  return (
    <>
      <aside className="hidden rounded border border-border bg-surface p-5 lg:block">
        <DetailsContent asset={asset} />
      </aside>

      <section className="hidden rounded border border-border bg-surface md:block lg:hidden">
        <button
          className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left text-sm font-medium text-text transition-colors hover:bg-white/5"
          type="button"
          onClick={onToggleTablet}
        >
          <span>Asset details</span>
          <span className="text-text-muted">{isTabletOpen ? "Hide" : "Show"}</span>
        </button>
        {isTabletOpen ? (
          <div className="border-t border-border p-4">
            <DetailsContent asset={asset} />
          </div>
        ) : null}
      </section>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-40 flex items-end bg-black/70 md:hidden">
          <section className="h-[92vh] w-full overflow-y-auto rounded-t border border-border bg-surface p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-[0.24em] text-text-muted">
                Asset details
              </h2>
              <button
                aria-label="Close details panel"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-border text-text"
                type="button"
                onClick={onCloseMobile}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <DetailsContent asset={asset} />
          </section>
        </div>
      ) : null}
    </>
  );
}
