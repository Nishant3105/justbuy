import SummaryCards from "../components/dashboard/SummaryCards";
import RevenueChart from "../components/charts/RevenueChart";
import PaymentPie from "../components/charts/PaymentPie";
import TopProductsChart from "../components/charts/TopProductsChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import { useDashboardStats } from "../../hooks/useDashboardStats";

const Dashboard = () => {

  const { data, isLoading } = useDashboardStats();

  if (isLoading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      
      <div className="space-y-6">

        <SummaryCards />

        <div className="grid grid-cols-2 gap-6">
          <RevenueChart />
          <PaymentPie />
        </div>

        <TopProductsChart />

        <RecentOrders />

      </div>
    </div>
  );
};

export default Dashboard;
