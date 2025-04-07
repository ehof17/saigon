'use server'

import { db } from "@/db/drizzle";
import { menu_items_2, items, variation_group_items_2, variation_groups_2, menu_item_variation_groups_2 } from "@/db/schema";
import { eq, not, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getItemsAvailable = async () => {
  const data = await db
    .select()
    .from(menu_items_2)
    .where(eq(menu_items_2.availability, true))
    .orderBy(menu_items_2.name);
  return data;
}
// Returns available entrees along with their variation groups and options.
export const getEntreesWithVariations = async () => {
    // 1. Get available entrees from the menu_items_2 table.
    const entrees = await db
      .select()
      .from(menu_items_2)
      .where(eq(menu_items_2.availability, true))
      .orderBy(menu_items_2.name);
  
    // 2. For each entree, fetch the associated variation groups and options.
    const results = await Promise.all(
      entrees.map(async (entree) => {
        // Fetch the variation groups linked to this menu item.
        const groups = await db
          .select()
          .from(menu_item_variation_groups_2)
          .where(eq(menu_item_variation_groups_2.menu_item_id, entree.item_id));
  
        // For each group, get its details from variation_groups and then its options.
        const groupsWithOptions = await Promise.all(
          groups.map(async (group) => {
            // Get group details.
            const groupDetails = await db
              .select()
              .from(variation_groups_2)
              .where(eq(variation_groups_2.variation_group_id, group.variation_group_id));
            const groupDetail = groupDetails[0]; // should be a single record
  
            // Get options for this variation group.
            const options = await db
              .select()
              .from(variation_group_items_2)
              .where(eq(variation_group_items_2.variation_group_id, group.variation_group_id))
              .orderBy(variation_group_items_2.variation_group_id);
  
            return { ...groupDetail, options };
          })
        );
  
        return { ...entree, variationGroups: groupsWithOptions };
      })
    );
  
    return results;
  };

// get the variations
// menu_item_variation_groups_2
// has a menu_item_id and variation_group_id
// variation_groups has an id, name, and min/max selection

// variation_group_items_2
// will have an id and price adjustment references the variation_group_id
// so we need to return the entree, along with all the options
// And render dropdowns for each


