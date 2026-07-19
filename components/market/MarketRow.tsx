"use client";

import { memo, type KeyboardEvent } from "react";
import type { Asset } from "@/lib/types/market";
import type { MarketColumn } from "./MarketTable";

interface MarketRowProps {
  asset: Asset;
  columns: MarketColumn[];
  selected: boolean;
  onSelect: (assetId: string) => void;
}

function MarketRowBase({
  asset,
  columns,
  selected,
  onSelect,
}: Readonly<MarketRowProps>) {
  const handleActivate = () => onSelect(asset.id);

  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleActivate();
  };

  return (
    <tr
      aria-selected={selected}
      className={[
        "cursor-pointer border-b border-border transition-colors last:border-b-0",
        selected ? "bg-accent/10" : "hover:bg-white/5",
      ].join(" ")}
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
    >
      {columns.map((column, index) => {
        const cellClassName = [
          "px-4 py-4 align-middle",
          column.hiddenOnMobile ? "hidden md:table-cell" : "",
          column.className ?? "",
          index === 0 ? "pl-5" : "",
          selected ? "text-text" : "",
        ]
          .filter(Boolean)
          .join(" ");

        if (index === 0) {
          return (
            <th
              key={column.key}
              scope="row"
              className={cellClassName}
            >
              {column.render(asset)}
            </th>
          );
        }

        return (
          <td key={column.key} className={cellClassName}>
            {column.render(asset)}
          </td>
        );
      })}
    </tr>
  );
}

function areMarketRowPropsEqual(prevProps: MarketRowProps, nextProps: MarketRowProps) {
  return (
    prevProps.asset === nextProps.asset &&
    prevProps.selected === nextProps.selected &&
    prevProps.columns === nextProps.columns &&
    prevProps.onSelect === nextProps.onSelect
  );
}

export default memo(MarketRowBase, areMarketRowPropsEqual);
