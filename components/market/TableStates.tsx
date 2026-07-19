interface LoadingStateProps {
  rowCount?: number;
}

function LoadingState({ rowCount = 8 }: Readonly<LoadingStateProps>) {
  return (
    <div className="overflow-hidden rounded border border-border bg-surface" role="status" aria-live="polite">
      <table className="w-full table-fixed border-collapse">
        <caption className="sr-only">Loading market table</caption>
        <thead className="bg-background/60 text-left text-xs uppercase tracking-[0.28em] text-text-muted">
          <tr className="border-b border-border">
            <th scope="col" className="w-[42%] px-4 py-3 pl-5 font-medium">
              Asset
            </th>
            <th scope="col" className="w-[19%] px-4 py-3 text-right font-medium">
              Price
            </th>
            <th scope="col" className="w-[19%] px-4 py-3 text-right font-medium">
              24h
            </th>
            <th
              scope="col"
              className="hidden w-[20%] px-4 py-3 text-right font-medium md:table-cell"
            >
              Volume
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, index) => (
            <tr key={index} className="border-b border-border last:border-b-0">
              <td className="px-4 py-4 pl-5">
                <div className="h-4 w-28 animate-pulse rounded bg-border" />
                <div className="mt-2 h-3 w-16 animate-pulse rounded bg-border" />
              </td>
              <td className="px-4 py-4 text-right">
                <div className="ml-auto h-4 w-20 animate-pulse rounded bg-border" />
              </td>
              <td className="px-4 py-4 text-right">
                <div className="ml-auto h-4 w-16 animate-pulse rounded bg-border" />
              </td>
              <td className="hidden px-4 py-4 text-right md:table-cell">
                <div className="ml-auto h-4 w-16 animate-pulse rounded bg-border" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface ErrorStateProps {
  onRetry: () => void;
}

function ErrorState({ onRetry }: Readonly<ErrorStateProps>) {
  return (
    <div className="rounded border border-border bg-surface p-5 text-sm text-loss">
      <p>Unable to load market data.</p>
      <button
        className="mt-3 cursor-pointer rounded border border-border px-3 py-2 text-sm text-text transition-colors hover:border-accent hover:text-accent"
        type="button"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded border border-border bg-surface p-5 text-sm text-text-muted">
      No assets match your search.
    </div>
  );
}

const TableStates = {
  Loading: LoadingState,
  Error: ErrorState,
  Empty: EmptyState,
};

export default TableStates;
