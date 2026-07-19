import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  onRefresh: () => void;
  isFetching: boolean;
}

export default function RefreshButton({
  onRefresh,
  isFetching,
}: Readonly<RefreshButtonProps>) {
  return (
    <button
      aria-label="Refresh market data"
      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-border bg-background text-text transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
      type="button"
      onClick={onRefresh}
      disabled={isFetching}
      title={isFetching ? "Refreshing market data" : "Refresh market data"}
    >
      <RefreshCw
        size={16}
        className={isFetching ? "animate-spin" : ""}
        aria-hidden="true"
      />
      <span className="sr-only">
        {isFetching ? "Refreshing market data" : "Refresh market data"}
      </span>
    </button>
  );
}
