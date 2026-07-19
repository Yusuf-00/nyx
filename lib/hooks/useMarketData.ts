"use client";

import { useQuery } from "@tanstack/react-query";
import { getMarkets } from "@/lib/api/coingecko";

export const useMarketData = () => {
  const query = useQuery({
    queryKey: ["markets"],
    queryFn: getMarkets,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    isRefetchError: query.isRefetchError,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};
