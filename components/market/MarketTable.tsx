import type { ReactNode } from "react";
import type { Asset } from "@/lib/types/market";
import {
  formatPercentage,
  formatPrice,
  formatVolume,
} from "@/lib/utils/formatters";
import MarketRow from "./MarketRow";

export interface MarketColumn {
  key: string;
  label: string;
  className?: string;
  hiddenOnMobile?: boolean;
  render: (asset: Asset) => ReactNode;
}

interface MarketTableProps {
  assets: Asset[];
  selectedAssetId: string | null;
  onSelectAsset: (assetId: string) => void;
}

const marketColumns: MarketColumn[] = [
  {
    key: "asset",
    label: "Asset",
    className: "w-[42%]",
    render: (asset) => (
      <div className="flex min-w-0 flex-col gap-1">
        <span className="truncate text-sm font-medium text-text">
          {asset.name}
        </span>
        <span className="text-xs uppercase tracking-[0.24em] text-text-muted">
          {asset.symbol}
        </span>
      </div>
    ),
  },
  {
    key: "price",
    label: "Price",
    className: "w-[19%] text-right font-mono text-sm",
    render: (asset) => formatPrice(asset.currentPrice),
  },
  {
    key: "change",
    label: "24h",
    className: "w-[19%] text-right font-mono text-sm",
    render: (asset) => {
      const change = asset.priceChangePercentage24h;

      return (
        <span
          className={
            change === null
              ? "text-text-muted"
              : change > 0
                ? "text-gain"
                : change < 0
                  ? "text-loss"
                  : "text-text-muted"
          }
        >
          {formatPercentage(change)}
        </span>
      );
    },
  },
  {
    key: "volume",
    label: "Volume",
    className: "w-[20%] text-right font-mono text-sm",
    hiddenOnMobile: true,
    render: (asset) => formatVolume(asset.totalVolume),
  },
];

export default function MarketTable({
  assets,
  selectedAssetId,
  onSelectAsset,
}: Readonly<MarketTableProps>) {
  return (
    <div className="overflow-hidden rounded border border-border bg-surface">
      <table className="w-full table-fixed border-collapse">
        <caption className="sr-only">Crypto market watch table</caption>
        <thead className="bg-background/60 text-left text-xs uppercase tracking-[0.28em] text-text-muted">
          <tr className="border-b border-border">
            {marketColumns.map((column, index) => {
              const headerClassName = [
                "px-4 py-3 font-medium",
                index === 0 ? "pl-5" : "",
                column.className ?? "",
                column.hiddenOnMobile ? "hidden md:table-cell" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <th key={column.key} scope="col" className={headerClassName}>
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? (
            assets.map((asset) => (
              <MarketRow
                key={asset.id}
                asset={asset}
                columns={marketColumns}
                selected={asset.id === selectedAssetId}
                onSelect={onSelectAsset}
              />
            ))
          ) : (
            <tr>
              <td
                className="px-4 py-8 text-center text-sm text-text-muted"
                colSpan={marketColumns.length}
              >
                No assets match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
