// npm i drizzle-orm
// npm i -D drizzle-kit

import {  text, serial, pgTable, timestamp, varchar, numeric, boolean, integer } from "drizzle-orm/pg-core";



// item_groups
// meat
// rice
// noodle

// items
// chicken -> meat
// steak -> meat
// fried rice -> rice
// garlic noodle -> noodle

export const item_groups = pgTable("item_groups", {
    id: serial("id").primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: text("description"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
});

export type SelectItemGroup = typeof item_groups.$inferSelect;

export const items = pgTable("items", {
  item_id: serial("item_id").primaryKey().notNull(),
  item_group_id: integer("item_group_id")
    .notNull()
    .references(() => item_groups.id, { onDelete: "cascade" }),
  name: varchar({ length: 255 }).notNull(),
  description: text("description"),
  availability: boolean("availability").default(true),
});
export type SelectItems = typeof items.$inferSelect;


export const menu_items_2 = pgTable("menu_items_2", {
  item_id: serial("menu_item_id").primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: text("description"),
  availability: boolean("availability").default(true),
});



export const variation_groups_2 = pgTable("variation_groups_2", {
    variation_group_id: serial("id").primaryKey().notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: text("description"),
    min_selection: integer("min_selection").notNull().default(0),
    max_selection: integer("max_selection").notNull().default(1),
  });

export const variation_group_items_2 = pgTable("variation_group_items_2", {
    variation_id: serial("id").primaryKey().notNull(),
    variation_group_id: integer("variation_group_id")
      .notNull()
      .references(() => variation_groups_2.variation_group_id, { onDelete: "cascade" }),
    name: varchar({ length: 255 }).notNull(),
    description: text("description"),
    price_adjustment: numeric({ precision: 10, scale: 2 })
      .notNull()
      .default('0.00'),
    item_id: integer("item_id").notNull().references(() => items.item_id, { onDelete: "cascade" }),
});

export const menu_item_variation_groups_2 = pgTable("menu_item_variation_groups_2", {
  menu_item_id: integer("menu_item_id").notNull().references(() => menu_items_2.item_id, { onDelete: "cascade" }),
  variation_group_id: integer("variation_group_id")
    .notNull()
    .references(() => variation_groups_2.variation_group_id, { onDelete: "cascade" }),
} );




// export const menuItems = pgTable("menu_items", {
//     id: serial("id").primaryKey().notNull(),
//     name: varchar({ length: 255 }).notNull(),
//     description: text("description"),
//     base_price: numeric({ precision: 10, scale: 2 }).notNull(),
//     // Maybe should make this a foreign key and add a table for category
//     // but for now its just string like 'base'
//     type: varchar({ length: 50 }).notNull(),
//     availability: boolean("availability").default(true),
//     created_at: timestamp("created_at").defaultNow(),
//     updated_at: timestamp("updated_at").defaultNow()

// });


// export const variationGroups = pgTable("variation_groups", {
//     id: serial("id").primaryKey().notNull(),
//     account_id: integer("account_id"),
//     name: varchar({ length: 255 }).notNull(),
//     description: text("description"),
//     min_selection: integer("min_selection").notNull().default(0),
//     max_selection: integer("max_selection").notNull().default(1),
//   });

//   export const variationGroupItems = pgTable("variation_group_items", {
//     id: serial("id").primaryKey().notNull(),
//     variation_group_id: integer("variation_group_id")
//       .notNull()
//       .references(() => variationGroups.id, { onDelete: "cascade" }),
//     name: varchar({ length: 255 }).notNull(),
//     description: text("description"),
//     price_adjustment: numeric({ precision: 10, scale: 2 })
//       .notNull()
//       .default('0.00')
//   });

  

// export const menuItemVariationGroups = pgTable("menu_item_variation_groups", {
//     id: serial("id").primaryKey().notNull(),
//     menu_item_id: integer("menu_item_id")
//       .notNull()
//       .references(() => menuItems.id, { onDelete: "cascade" }),
//     variation_group_id: integer("variation_group_id")
//       .notNull()
//       .references(() => variationGroups.id, { onDelete: "cascade" }),
//   });
  

//   export const orders = pgTable("orders", {
//     id: serial("id").primaryKey().notNull(),
//     customer_name: varchar({ length: 255 }),
//     customer_phone: varchar({ length: 50 }),
//     order_date: timestamp("order_date", { withTimezone: true }).defaultNow(),
//     status: varchar({ length: 50 }).notNull().default("pending"),
//     total_price: numeric({ precision: 10, scale: 2 }).default('0.00'),
//   });
  

//   export const orderItems = pgTable("order_items", {
//     id: serial("id").primaryKey().notNull(),
//     order_id: integer("order_id")
//       .notNull()
//       .references(() => orders.id, { onDelete: "cascade" }),
//     menu_item_id: integer("menu_item_id")
//       .notNull()
//       .references(() => menuItems.id, { onDelete: "cascade" }),
//     quantity: integer("quantity").notNull().default(1),
//     price: numeric({ precision: 10, scale: 2 }).notNull(),
//     special_instructions: text("special_instructions"),
//   });

// // -- Insert meat items
// // INSERT INTO menu_items (name, description, base_price, type)
// // VALUES 
// //   ('Chicken', 'Juicy grilled chicken', 5.00, 'meat'),
// //   ('Steak', 'Grilled sirloin steak', 7.00, 'meat');

// // INSERT INTO menu_items (name, description, base_price, type)
// // VALUES 
// //   ('Garlic Noodle', 'Noodles tossed in a garlic sauce', 3.50, 'base'),
// //   ('Fried Rice', 'Traditional fried rice with vegetables', 3.00, 'base');

// // INSERT INTO menu_items (name, description, base_price, type)
// // VALUES 
// //   ('Plate', 'A customizable plate with a base and a meat option', 10.00, 'composite');
