// assets
import { IconFileStack } from '@tabler/icons';

// constant
const icons = { IconFileStack };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconFileStack,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
