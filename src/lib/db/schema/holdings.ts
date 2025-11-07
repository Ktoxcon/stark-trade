import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { Portfolio } from "./portfolio";

export const Holdings = sqliteTable(
  "Holdings",
  {
    portfolioId: integer("portfolioId")
      .notNull()
      .references(() => Portfolio.id),
    symbol: text("symbol", { length: 10 }).notNull(),
    quantity: integer("quantity").notNull(),
  },
  ({ portfolioId, symbol }) => [primaryKey({ columns: [symbol, portfolioId] })]
);
