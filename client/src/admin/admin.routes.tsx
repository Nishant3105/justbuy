// src/admin/admin.routes.tsx
import AdminRoute from "./routes/AdminRoutes";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import AdminLogin from "./pages/AdminLogin";

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
];
