export interface Asset {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  priceChangePercentage24h: number | null;
  totalVolume: number;
  high24h: number;
  low24h: number;
  lastUpdated: string;
}

export interface AssetDetails {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  high24h: number;
  low24h: number;
  totalVolume: number;
  lastUpdated: string;
}
