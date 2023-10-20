// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
// assets
import { IconFileStack } from '@tabler/icons';

// constant
const icons = { IconFileStack };

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {

  const collections = {
    id: 'collections',
    title: 'Collections',
    type: 'group',
    children: []
  };


collections["children"] = [
    {
      id: 'medbill',
      caption: "My personal medical bills",
      title: 'Medical Bills',
      type: 'item',
      url: '/dashboard/default',
      chip: {
        color: 'primary',
        variant: 'outlined',
        size: '20',
        label: 'Options',
        avatar: 'Hi'
      },
      icon: icons.IconFileStack,
      breadcrumbs: false
    },
    {
      id: 'medbill1',
      caption: "Research Papers on CNN",
      title: 'Research Papers',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconFileStack,
      breadcrumbs: false
    },
    {
      id: 'medbill2',
      caption: "Law Document on Tax Research",
      title: 'Laws',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconFileStack,
      breadcrumbs: false
    },
    {
      id: 'medbill3',
      caption: "Anatomy books for doctors",
      title: 'Medical Queries',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconFileStack,
      breadcrumbs: false
    }
  ];

  return <NavGroup key={collections.id} item={collections} />;
};

export default MenuList;
