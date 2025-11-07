import type { Stock } from "./stock.types";

export type BuyStockInput = {
  price: number;
  symbol: string;
  quantity: number;
};

export type BuyStockOutput = {
  price: number;
  symbol: string;
};

export type GetAllStocksOutput = {
  items: Stock[];
  nextToken?: string;
};

export type FuseApiResponse<T> = {
  data: T;
  status: number;
};
