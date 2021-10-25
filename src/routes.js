import Dashboard from '@material-ui/icons/Dashboard';
import CategoryPage from 'features/Category';
import FaqPage from 'features/Faq';
import DashboardPage from 'views/Dashboard/Dashboard.js';
import StaffsTableList from 'views/StaffsTableList/StaffsTableList.js';

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/staff',
    name: 'Staff List',
    icon: 'group_icon',
    component: StaffsTableList,
    layout: '/admin',
  },
  {
    path: '/faq',
    name: 'Faqs',
    icon: 'content_paste',
    component: FaqPage,
    layout: '/admin',
  },
  {
    path: '/category',
    name: 'Categories',
    icon: 'category_icon',
    component: CategoryPage,
    layout: '/admin',
  },
];

export default dashboardRoutes;
