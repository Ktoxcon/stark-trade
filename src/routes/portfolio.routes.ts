import { PortfolioController } from "@stark-trade/controllers/portfolio.controller";
import { AuthMiddleware } from "@stark-trade/middleware/auth.middleware";
import { UrlEncodedMiddleware } from "@stark-trade/middleware/url-encoded.middleware";
import { Router } from "express";

export const PortfolioRouter = Router();

PortfolioRouter.use(UrlEncodedMiddleware);

PortfolioRouter.get("/:id", AuthMiddleware, PortfolioController.getPortfolio);
