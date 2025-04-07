// /app/orders/page.tsx
import React from 'react';
import { getItemsAvailable, getEntreesWithVariations } from '@/actions/orderActions';
import OrderItemCard from '@/components/orderItemCard';
import { menuItemAvailableToOrder } from '@/types/menuTypes';

export default async function OrdersPage() {
  // Fetch available items from your database via the server action.
  const availableItems = await getItemsAvailable();
  const hm = await getEntreesWithVariations();
  console.log({hm})
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Items</h1>
      <div className="grid grid-cols-1 gap-4">
        {hm.map((item: menuItemAvailableToOrder ) => (
          <OrderItemCard key={item.item_id} item={item} />
        ))}
      </div>
    </div>
  );
}