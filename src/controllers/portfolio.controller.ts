import { db } from "@stark-trade/lib/db";
import { Holdings, Portfolio } from "@stark-trade/lib/db/schema";
import { IdParamSchema } from "@stark-trade/lib/validators/model.schemas";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

export const PortfolioController = {
  async getPortfolio(request: Request, response: Response) {
    try {
      const userId = IdParamSchema.parse(request.params.id);

      const [portfolio] = await db
        .select()
        .from(Portfolio)
        .where(eq(Portfolio.userId, userId));

      if (!portfolio) {
        return response.status(404).send({
          success: false,
          error: "Portfolio not found.",
        });
      }

      const holdings = await db
        .select()
        .from(Holdings)
        .where(eq(Holdings.portfolioId, portfolio.id));

      response.send({ success: true, data: holdings });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send({ success: false, error: error.message });
      }
    }
  },
};
