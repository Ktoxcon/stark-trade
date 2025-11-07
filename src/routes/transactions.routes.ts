import { TransactionsController } from "@stark-trade/controllers/transactions.controller";
import { AuthMiddleware } from "@stark-trade/middleware/auth.middleware";
import { UrlEncodedMiddleware } from "@stark-trade/middleware/url-encoded.middleware";
import { Router } from "express";

export const TransactionsRoutes = Router();

TransactionsRoutes.use(UrlEncodedMiddleware);

TransactionsRoutes.post("/", AuthMiddleware, TransactionsController.buy);
