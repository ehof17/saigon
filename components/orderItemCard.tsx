'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { menuItemAvailableToOrder } from "@/types/menuTypes";

interface OrderItemCardProps {
  item: menuItemAvailableToOrder;
}

export default function OrderItemCard({ item }: OrderItemCardProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  // Object mapping variation group IDs to the selected option IDs.
  const [selectedVariations, setSelectedVariations] = useState<{ [groupId: number]: number }>({});

  // Update state when a variation option is selected.
  const handleVariationChange = (groupId: number, optionId: number) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [groupId]: optionId,
    }));
  };

  const handleOrder = async () => {
    const orderData = {
      itemId: item.item_id,
      quantity,
      variations: selectedVariations
    };

    console.log("Placing order with data:", orderData);

    // TODO: Call your API endpoint to place the order, e.g.:
    // const response = await fetch('/api/orderItem', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(orderData),
    // });
    // if (response.ok) {
    //   router.refresh();
    // } else {
    //   console.error('Failed to place order');
    // }
  };

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p>{item.description}</p>
      <p>Availability: {item.availability ? 'Available' : 'Unavailable'}</p>
      
      {item.variationGroups.map((group) => (
        <div key={group.variation_group_id} className="mt-2">
          <h3 className="text-lg font-semibold">{group.name}</h3>
          {group.options.map((option) => (
            <div key={option.variation_id} className="flex items-center">
              <input
                type="radio"
                name={`group-${group.variation_group_id}`}
                value={option.variation_id}
                className="mr-2"
                checked={selectedVariations[group.variation_group_id] === option.variation_id}
                onChange={() => handleVariationChange(group.variation_group_id, option.variation_id)}
              />
              <label>{option.name} $: {option.price_adjustment}</label>
            </div>
          ))}
        </div>
      ))}

      <div className="flex items-center space-x-2 mt-2">
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-1 w-16 text-black"
        />
        <button
          onClick={handleOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={!item.availability}
        >
          Order
        </button>
      </div>
    </div>
    
  );
}