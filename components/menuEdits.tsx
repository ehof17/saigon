'use client';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import AddMenuItemGroup from './addMenuItemGroup';
import AddMenuItem from './addMenuItem';
import ConfirmModal from './confirmModal';
import {
   addItemGroup,
  deleteItemGroup,
  addItem,
  deleteItem,
} from '@/actions/menuActions';
import { menuItem, menuItemGroup} from '@/types/menuTypes';
import { set } from 'mobx';
interface MenuEditsProps {
  menuItemGroups: menuItemGroup[];
    menuItems: menuItem[];
}
export default function menuEdits({ menuItemGroups, menuItems }: MenuEditsProps) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [menuItemGroup, setMenuItemGroup] = useState<number>(menuItemGroups.length> 0? menuItemGroups[0].id: -1);
    const [menuItemName, setMenuItemName] = useState('');
    const [menuItemDescription, setMenuItemDescription] = useState('');

    const [confirmFunction, setConfirmFunction] = useState<() => void>(() => () => {});
    const [confirmMessage, setConfirmMessage] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleAddMenuItemGroup = async () => {
    await addItemGroup(name, description);
    setName('');
    setDescription('');
    router.refresh();
  };

  const handleAddMenuItem = async () => {
    console.log({menuItemGroup})    
    console.log({menuItemName})
    console.log({menuItemDescription})
    await addItem(menuItemGroup, menuItemName, menuItemDescription);
    setMenuItemName('');
    setMenuItemDescription('');
    router.refresh();

  };
  const handleDeleteItem = async () => {
    if (itemToDelete !== null) {
      await deleteItem(itemToDelete);
      router.refresh();
      setItemToDelete(null);
      setConfirmOpen(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (itemToDelete !== null) {
      await deleteItemGroup(itemToDelete);
      router.refresh();
      setItemToDelete(null);
      setConfirmOpen(false);
    }
  };
 
  return (
    <div>
      <AddMenuItemGroup
        handleAddMenuItemGroup={handleAddMenuItemGroup}
        name={name}
        description={description}
        onNameChange={setName}
        onDescriptionChange={setDescription}
      />
      <AddMenuItem
       handleAddMenuItem={handleAddMenuItem}
       name={menuItemName}
       description={menuItemDescription}
       selectedGroupID={menuItemGroup}
       allGroups={menuItemGroups}
       onNameChange={setMenuItemName}
       onDescriptionChange={setMenuItemDescription}
       onGroupChange={setMenuItemGroup}
      />
       <ConfirmModal
        isOpen={confirmOpen}
        message={confirmMessage}
        onConfirm={handleDeleteItem}
        onCancel={() => setConfirmOpen(false)}
      />

      <h2 className="text-lg font-bold mb-4">Menu Item Groups</h2>
      {menuItemGroups.map((group) => (
        <Fragment key={group.id}>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{group.name}</h2>
              <button
                onClick={async () => {
                    setItemToDelete(group.id);
                    setConfirmFunction(() => handleDeleteGroup);
                    setConfirmMessage('Are you sure you want to delete this group?');
                    setConfirmOpen(true);
                  router.refresh();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Group
              </button>
            </div>
            <p className="text-gray-300 mt-2">{group.description}</p>
            <ul className="mt-4 space-y-2">
              {menuItems
                .filter((item) => item.item_group_id === group.id)
                .map((item) => (
                  <li
                    key={item.item_id}
                    className="flex items-center justify-between p-2 bg-gray-700 rounded"
                  >
                    <div>
                      <span className="text-white">
                        <strong>{item.name}</strong> - {item.description}
                      </span>
                      <span className="text-white ml-4">
                        Availability: {item.availability ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setItemToDelete(item.item_id);
                        setConfirmFunction(() => handleDeleteItem);
                        setConfirmMessage('Are you sure you want to delete this item?');
                        setConfirmOpen(true);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete Item
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </Fragment>
      ))}
    </div>
    );
}