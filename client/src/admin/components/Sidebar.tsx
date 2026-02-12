// src/admin/components/Sidebar.tsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow">
      <h1 className="p-4 text-lg font-bold">CMS</h1>

      <nav className="space-y-2 px-4">
        <Link to="/admin" className="block rounded p-2 hover:bg-gray-100">
          Dashboard
        </Link>
        <Link to="/admin/products" className="block rounded p-2 hover:bg-gray-100">
          Products
        </Link>
        <Link to="/admin/users" className="block rounded p-2 hover:bg-gray-100">
          Users
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
