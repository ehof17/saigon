import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
interface MenuItem {
  id: number;
  name: string;
  base_price: number;
}

export default async function Page() {



  return (
    <div>
      <h1>Menu Items</h1>
      <ul>
  
      </ul>
    </div>
  );
}
