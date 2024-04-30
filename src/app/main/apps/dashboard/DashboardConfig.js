import Dashboard from './pages/Dashboard';

const DashboardConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/dashboard/',
      element: <Dashboard />,
    },
  ],
};

export default DashboardConfig;
