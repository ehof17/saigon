CREATE TABLE "menu_items_2" (
	"menu_item_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"availability" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "variation_group_items_2" DROP CONSTRAINT "variation_group_items_2_item_id_order_items_2_id_fk";
--> statement-breakpoint
ALTER TABLE "variation_group_items_2" ADD CONSTRAINT "variation_group_items_2_item_id_items_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("item_id") ON DELETE cascade ON UPDATE no action;