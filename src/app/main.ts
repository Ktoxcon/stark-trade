import { AuthRouter } from "@stark-trade/routes/auth.routes";
import { PortfolioRouter } from "@stark-trade/routes/portfolio.routes";
import { TransactionsRouter } from "@stark-trade/routes/transactions.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

export const app = express();

app.use(cors());
app.use(cookieParser());
app.use(morgan("combined"));

app.use("/auth", AuthRouter);
app.use("/portfolios", PortfolioRouter);
app.use("/transactions", TransactionsRouter);
