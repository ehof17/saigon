import { getItemGroups, getMenuItems } from '@/actions/menuActions';
import MenuEdits from '@/components/menuEdits';

export default async function Home() {
  const itemGroups = await getItemGroups();
  const menuItems = await getMenuItems();
  console.log({itemGroups})
  console.log({menuItems})
  return (
    <div className='p-4'>
      <MenuEdits menuItemGroups={itemGroups} menuItems={menuItems}/>
    </div>
  );
}