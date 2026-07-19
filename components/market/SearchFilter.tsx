"use client";

import { useEffect, useState } from "react";

interface SearchFilterProps {
  onSearchChange: (searchTerm: string) => void;
}

export default function SearchFilter({
  onSearchChange,
}: Readonly<SearchFilterProps>) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const debounceTimer = window.setTimeout(() => {
      onSearchChange(searchInput);
    }, 200);

    return () => {
      window.clearTimeout(debounceTimer);
    };
  }, [onSearchChange, searchInput]);

  return (
    <label className="flex w-full flex-col gap-2 text-sm text-text-muted">
      Search
      <input
        aria-label="Search assets by name or symbol"
        className="w-full rounded border border-border bg-background px-3 py-2 text-text outline-none transition-colors placeholder:text-text-muted/60 focus:border-accent"
        placeholder="Search by name or symbol"
        type="search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
    </label>
  );
}
