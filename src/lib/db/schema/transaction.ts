import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Portfolio } from "./portfolio";

export const Transaction = sqliteTable("Transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  portfolioId: integer("portfolioId")
    .notNull()
    .references(() => Portfolio.id),
  symbol: text("symbol", { length: 10 }).notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("vendor_price").notNull(),
  status: text("status").notNull(),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP").notNull(),
});
