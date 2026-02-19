import { Link } from "react-router-dom";
import { useSummary } from "../../../hooks/useAnalytics";

const SummaryCards = () => {
  const { data } = useSummary();

  return (
    <div className="grid grid-cols-4 gap-6">

      <Card title="Total Users" value={data?.totalUsers} to="/admin/users" />

      <Card title="Total Products" value={data?.totalProducts} to="/admin/products" />

      <Card title="Total Orders" value={data?.totalOrders} to="/admin/users" />

      <Card
        title="Revenue"
        value={`₹${data?.totalRevenue?.toLocaleString()}`}
      />

    </div>
  );
};

const Card = ({ title, value, to }: any) => (
    <Link
    to={to}
    className="
      block
      bg-white
      p-6
      rounded-xl
      shadow
      hover:shadow-lg
      hover:-translate-y-1
      transition
      duration-200
      cursor-pointer
    "
  >
    <p className="text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold">{value}</h2>
  </Link>
);

export default SummaryCards;
