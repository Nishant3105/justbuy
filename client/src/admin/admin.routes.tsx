import AdminRoute from "./routes/AdminRoutes";
import AdminLayout from "./components/AdminLayout";
import { lazy } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Users = lazy(() => import("./pages/Users"));
const UserOrders = lazy(() => import("./components/UserOrders"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Orders = lazy(() => import("./pages/Orders"));

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
