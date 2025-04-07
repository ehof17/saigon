'use client';

interface AddMenuItemGroupProps {
  handleAddMenuItemGroup: () => void;
  name: string;
  description: string;
  onNameChange: (newName: string) => void;
  onDescriptionChange: (newDescription: string) => void;
}

export default function AddMenuItemGroup({
  handleAddMenuItemGroup,
  name,
  description,
  onNameChange,
  onDescriptionChange,
}: AddMenuItemGroupProps) {
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1 font-bold">Menu Item Group Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter menu item group name"
          className="border border-gray-300 p-2 w-full text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold">Menu Item Group Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Enter menu item group description"
          className="border border-gray-300 p-2 w-full text-black"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={handleAddMenuItemGroup}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Menu Item Group
        </button>
      </div>
    </div>
  );
}