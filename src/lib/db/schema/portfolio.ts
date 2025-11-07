import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { User } from "./user";

export const Portfolio = sqliteTable("Portfolios", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("userId")
    .notNull()
    .references(() => User.id),
  name: text("name").notNull(),
});
