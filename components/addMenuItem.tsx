'use client';
import { menuItem, menuItemGroup } from "@/types/menuTypes";
import { revalidatePath } from "next/cache";

interface AddMenuItemProps {
  handleAddMenuItem: () => void;
  name: string;
  description: string;
  onNameChange: (newName: string) => void;
  onDescriptionChange: (newDescription: string) => void;
  selectedGroupID: number;
  allGroups: menuItemGroup[];
  onGroupChange: (newGroup: number) => void;
}

export default function AddMenuItem({
  handleAddMenuItem,
  name,
  description,
  selectedGroupID,
  allGroups,
  onNameChange,
  onDescriptionChange,
  onGroupChange
}: AddMenuItemProps) {
  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGroupID = parseInt(e.target.value, 10);
    const newGroup = allGroups.find(group => group.id === newGroupID);
    if (newGroup) {
      onGroupChange(newGroup.id);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1 font-bold">Menu Item Group:</label>
        <select 
          value={selectedGroupID}
          onChange={handleGroupChange}
          className="border border-gray-300 text-black p-2 w-full"
        >
          {allGroups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        <label className="block mb-1 font-bold">Menu Item Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter menu item name"
          className="border border-gray-300 p-2 w-full text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold">Menu Item Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Enter menu item description"
          className="border border-gray-300 p-2 w-full text-black"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={handleAddMenuItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Menu Item
        </button>
      </div>
    </div>
  );
}