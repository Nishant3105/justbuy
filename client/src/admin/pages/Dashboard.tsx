// src/admin/pages/Dashboard.tsx
const Dashboard = () => {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="mt-2 text-3xl font-bold">1,245</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Products</p>
          <h2 className="mt-2 text-3xl font-bold">342</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Orders</p>
          <h2 className="mt-2 text-3xl font-bold">876</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="mt-2 text-3xl font-bold">₹2.4L</h2>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-10 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>🛒 New order placed</li>
          <li>👤 New user registered</li>
          <li>📦 Product updated</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
