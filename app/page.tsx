import { neon } from '@neondatabase/serverless';

interface MenuItem {
  id: number;
  name: string;
  base_price: number;
}

export default async function Page() {
  const sql = neon(`${process.env.DATABASE_URL}`);

  const result = await sql`SELECT id, name, base_price FROM menu_items`;
  const menuItems: MenuItem[] = await sql.query(
    'SELECT id, name, base_price FROM menu_items'
  );
  // Record <string, any>[]
  console.log(result);

  return (
    <div>
      <h1>Menu Items</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            {item.name}: ${item.base_price}
          </li>
        ))}
      </ul>
    </div>
  );
}
