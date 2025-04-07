CREATE TABLE "item_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "order_items_2" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_group_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"base_price" numeric(10, 2) NOT NULL,
	"availability" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "menu_item_variation_groups" CASCADE;--> statement-breakpoint
DROP TABLE "menu_items" CASCADE;--> statement-breakpoint
DROP TABLE "order_items" CASCADE;--> statement-breakpoint
DROP TABLE "orders" CASCADE;--> statement-breakpoint
DROP TABLE "variation_group_items" CASCADE;--> statement-breakpoint
DROP TABLE "variation_groups" CASCADE;--> statement-breakpoint
ALTER TABLE "order_items_2" ADD CONSTRAINT "order_items_2_item_group_id_item_groups_id_fk" FOREIGN KEY ("item_group_id") REFERENCES "public"."item_groups"("id") ON DELETE cascade ON UPDATE no action;