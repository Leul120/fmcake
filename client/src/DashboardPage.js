import Sidebar from '../components/Sidebar';

import OverviewAnalytics from '../components/Dashboard/OverviewAnalytics';
// Import other components

const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        
        <main className="p-6">
          {/* Conditional rendering based on route */}
          <OverviewAnalytics />
          {/* Include other components based on the selected tab */}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
