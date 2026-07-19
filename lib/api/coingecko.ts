import type { Asset } from "@/lib/types/market";

const COINGECKO_BASE_URL =
  process.env.COINGECKO_BASE_URL ?? "https://api.coingecko.com/api/v3";

const DEMO_API_KEY = process.env.CG_DEMO_API_KEY;

interface CoinGeckoMarketResponse {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  last_updated: string;
}

const isNumberOrNull = (value: unknown): value is number | null =>
  typeof value === "number" || value === null;

const isCoinGeckoMarketResponse = (
  value: unknown,
): value is CoinGeckoMarketResponse => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.symbol === "string" &&
    typeof item.current_price === "number" &&
    isNumberOrNull(item.price_change_percentage_24h) &&
    isNumberOrNull(item.total_volume) &&
    isNumberOrNull(item.high_24h) &&
    isNumberOrNull(item.low_24h) &&
    typeof item.last_updated === "string"
  );
};

const toAsset = (item: CoinGeckoMarketResponse): Asset => ({
  id: item.id,
  name: item.name,
  symbol: item.symbol,
  currentPrice: item.current_price,
  priceChangePercentage24h: item.price_change_percentage_24h,
  totalVolume: item.total_volume ?? 0,
  high24h: item.high_24h ?? item.current_price,
  low24h: item.low_24h ?? item.current_price,
  lastUpdated: item.last_updated,
});

export const getMarkets = async (): Promise<Asset[]> => {
  if (!DEMO_API_KEY) {
    throw new Error("Missing CG_DEMO_API_KEY environment variable.");
  }

  const marketsUrl =
    `${COINGECKO_BASE_URL}/coins/markets` +
    "?vs_currency=usd&order=market_cap_desc&per_page=50&page=1";

  const response = await fetch(marketsUrl, {
    headers: {
      "x-cg-demo-api-key": DEMO_API_KEY,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch market data from CoinGecko (status ${response.status}).`,
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isCoinGeckoMarketResponse)) {
    throw new Error("CoinGecko returned an unexpected markets payload.");
  }

  return data.map(toAsset);
};
