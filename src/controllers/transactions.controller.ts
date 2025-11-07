import { db } from "@stark-trade/lib/db";
import { Portfolio } from "@stark-trade/lib/db/schema";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

export const TransactionsController = {
  async buy(request: Request, response: Response) {
    try {
      const { userId, symbol, quantity, price } = request.body;

      const [portfolio] = await db
        .select()
        .from(Portfolio)
        .where(eq(Portfolio.userId, userId));

      if (!portfolio) {
        response
          .status(404)
          .send({ success: false, error: "Portfolio not found." });

        return;
      }

      response.send({ success: true, status });
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).send({ success: false, error: error.message });
      }
    }
  },
};
