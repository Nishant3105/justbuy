import AdminRoute from "./routes/AdminRoutes";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import UserOrders from "./components/UserOrders";
import AdminLogin from "./pages/AdminLogin";
import Orders from "./pages/Orders";

export const adminRoutes = [
  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <AdminRoute>
        <AdminLayout>
          <Products />
        </AdminLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <AdminRoute>
        <AdminLayout>
          <Users />
        </AdminLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <AdminRoute>
        <AdminLayout>
          <Orders />
        </AdminLayout>
      </AdminRoute>
    ),
  },
  {
    path: "/admin/userorder/:userId",
    element: (
      <AdminRoute>
        <AdminLayout>
          <UserOrders />
        </AdminLayout>
      </AdminRoute>
    ),
  },
];
