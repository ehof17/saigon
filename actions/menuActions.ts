'use server'

import { db } from "@/db/drizzle";
import { item_groups, items } from "@/db/schema";
import { eq, not, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";



export const getItemGroups = async () => {
  const data = await db.select().from(item_groups).orderBy(item_groups.name);
  console.log("Data get called")
  return data;
}
export const addItemGroup = async (name: string, description: string) => {
    await db.insert(item_groups).values({
      name: name,
      description: description,
    });
    revalidatePath('/admin');
  }

  export const addItem = async (item_group_id: number, name: string, description: string) => {
    await db.insert(items).values({
      item_group_id: item_group_id,
      name: name,
      description: description,
    });
    revalidatePath('/admin');
  }
export const deleteItemGroup = async (id: number) => {
  await db.delete(item_groups).where(eq(item_groups.id, id));
  revalidatePath('/admin');
};


export const getMenuItems = async () => {
    const data = await db.select().from(items).orderBy(items.name);
    return data;
}
export const deleteItem = async (id: number) => {
  await db.delete(items).where(eq(items.item_id, id));
  revalidatePath('/admin');
};

// export const editTodo = async (id: number, text: string) => {
//   await db
//     .update(item_groups)
//     .set({
//       text: text,
//     })
//     .where(eq(todo.id, id));
//   revalidatePath("/");
// };
// export const toggleTodo = async (id: number) => {
//   await db
//     .update(todo)
//     .set({
//       done: not(todo.done),
//     })
//     .where(eq(todo.id, id));
//   revalidatePath("/");
// };