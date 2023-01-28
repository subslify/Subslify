import { ImProfile } from 'react-icons/im';

const links = [
  {
    id: 1,
    text: 'Summary',
    path: '/',
  },
  {
    id: 2,
    text: 'Active Subscriptions',
    path: '/active',
  },
  {
    id: 3,
    text: 'Trial Subscriptions',
    path: '/trial',
  },
  {
    id: 4,
    text: 'Past Subscriptions',
    path: '/past',
  },
  {
    id: 5,
    text: 'Add Subscription',
    path: '/add-subscription',
  },
  {
    id: 6,
    text: 'Profile',
    path: '/profile',
    icon: <ImProfile />,
  },
];

export default links;
