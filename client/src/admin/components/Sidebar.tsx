import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-col justify-between bg-white shadow">
      {/* Top section */}
      <div>
        <h1 className="p-4 text-lg font-bold border-b border-gray-200">CMS</h1>

        <nav className="mt-4 flex flex-col space-y-2 px-4">
          <Link to="/admin" className="block rounded p-2 hover:bg-gray-100">
            Dashboard
          </Link>
          <Link to="/admin/products" className="block rounded p-2 hover:bg-gray-100">
            Products
          </Link>
          <Link to="/admin/users" className="block rounded p-2 hover:bg-gray-100">
            Users
          </Link>
          <Link to="/admin/orders" className="block rounded p-2 hover:bg-gray-100">
            Orders
          </Link>
        </nav>
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={logout}
          className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;