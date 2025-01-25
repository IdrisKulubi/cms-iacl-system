import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

// USERS
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").notNull().default("NO_NAME"),
    email: text("email").notNull(),
    role: text("role").notNull().default("user"),
    image: text("image"),

    createdAt: timestamp("createdAt").defaultNow(),
  },
  (table) => {
    return {
      userEmailIdx: uniqueIndex("user_email_idx").on(table.email),
    };
  }
);
