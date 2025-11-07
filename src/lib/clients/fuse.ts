import type {
  BuyStockInput,
  BuyStockOutput,
  FuseApiResponse,
  GetAllStocksOutput,
} from "../types/fuse.client.types";

export class FuseStocksApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAll() {
    const response = await fetch(`${this.baseUrl}/stocks`, {
      headers: new Headers({
        "x-api-key": process.env.FUSE_API_KEY,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch stocks from vendor");
    }

    const { data }: FuseApiResponse<GetAllStocksOutput> = await response.json();

    return data;
  }

  async buy({ symbol, ...body }: BuyStockInput): Promise<BuyStockOutput> {
    const response = await fetch(`${this.baseUrl}/stocks/${symbol}/buy`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        "x-api-key": process.env.FUSE_API_KEY,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to execute stock purchase");
    }

    const output: BuyStockOutput = await response.json();

    return output;
  }
}
