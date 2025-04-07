CREATE TABLE "menu_item_variation_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"menu_item_id" integer NOT NULL,
	"variation_group_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"menu_item_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"special_instructions" text
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_name" varchar(255),
	"customer_phone" varchar(50),
	"order_date" timestamp with time zone DEFAULT now(),
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"total_price" numeric(10, 2) DEFAULT '0.00'
);
--> statement-breakpoint
CREATE TABLE "variation_group_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"variation_group_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price_adjustment" numeric(10, 2) DEFAULT '0.00' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variation_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_id" integer,
	"name" varchar(255) NOT NULL,
	"description" text,
	"min_selection" integer DEFAULT 0 NOT NULL,
	"max_selection" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "menu_item_variation_groups" ADD CONSTRAINT "menu_item_variation_groups_menu_item_id_menu_items_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu_item_variation_groups" ADD CONSTRAINT "menu_item_variation_groups_variation_group_id_variation_groups_id_fk" FOREIGN KEY ("variation_group_id") REFERENCES "public"."variation_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_menu_item_id_menu_items_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variation_group_items" ADD CONSTRAINT "variation_group_items_variation_group_id_variation_groups_id_fk" FOREIGN KEY ("variation_group_id") REFERENCES "public"."variation_groups"("id") ON DELETE cascade ON UPDATE no action;