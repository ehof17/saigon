// npm i drizzle-orm
// npm i -D drizzle-kit

import {  text, serial, pgTable, timestamp } from "drizzle-orm/pg-core";

export const menuItems = pgTable("menu_items", {
    id: serial("id").primaryKey().notNull(),
    name: varchar({ length: 50 }).notNull(),
    description: text("description")
    base_price:  not null
    type: varchar50 not null
    availability: boolean("availability").default(true),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
    slug: text("slug").notNull(),
});