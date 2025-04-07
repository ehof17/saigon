CREATE TABLE "items" (
	"item_id" serial PRIMARY KEY NOT NULL,
	"item_group_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "variation_group_items_2" (
	"id" serial PRIMARY KEY NOT NULL,
	"variation_group_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price_adjustment" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"item_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variation_groups_2" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"min_selection" integer DEFAULT 0 NOT NULL,
	"max_selection" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_item_group_id_item_groups_id_fk" FOREIGN KEY ("item_group_id") REFERENCES "public"."item_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variation_group_items_2" ADD CONSTRAINT "variation_group_items_2_variation_group_id_variation_groups_2_id_fk" FOREIGN KEY ("variation_group_id") REFERENCES "public"."variation_groups_2"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variation_group_items_2" ADD CONSTRAINT "variation_group_items_2_item_id_order_items_2_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."order_items_2"("id") ON DELETE cascade ON UPDATE no action;