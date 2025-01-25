import { NavbarItem } from '@poc/core/components/top-navbar/top-navbar.component';

export const APP_MENU_ITEMS: NavbarItem[] = [
  {
    name: 'home',
    label: 'Home',
    route: '/home',
    icon: ['ph', 'ph-house-line']
  },
  {
    name: 'customers',
    label: 'Customers',
    route: '/customers',
    icon: ['ph', 'ph-users-three']
  }
];
