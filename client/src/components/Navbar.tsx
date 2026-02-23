import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { LogIn } from "lucide-react";
import { useCartContext } from "../context/CartContext";
import AuthModal from "./models/Auth";
import { useAuth } from "../context/AuthContext";
import NavbarSearch from "./NavbarSearch";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartItems } = useCartContext();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [openAuth, setOpenAuth] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) setOpenMenu(false);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-800 text-white w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4 h-16 px-4">

        <div
          className="flex items-center gap-1 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img
            src="/applogo.png"
            className="h-16 w-auto object-contain transition-transform duration-500 ease-in-out group-hover:animate-spin"
            alt="JustBuy Logo"
          />
          <span className="text-xl font-bold text-white">JustBuy</span>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <NavbarSearch />
          </div>
        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/cart")}
            className="relative hover:text-yellow-300 transition"
            aria-label="Cart"
          >
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu((prev) => !prev)}
                className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1 text-gray-800 hover:bg-gray-300"
              >
                <img
                  src={user?.profilePic || "/auth.jpg"}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden md:inline">{user?.firstName} {user?.lastName}</span>
                <span>{openMenu ? "▲" : "▼"}</span>
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg border border-gray-200 z-50">
                  <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100" onClick={() => { navigate("/profile"); setOpenMenu(false) }}>Profile</button>
                  <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100" onClick={() => { navigate("/my-orders"); setOpenMenu(false) }}>My Orders</button>
                  {(user.role === "admin" || user.role === "staff") && (
                    <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100" onClick={() => { navigate("/admin"); setOpenMenu(false) }}>Admin Panel</button>
                  )}
                  <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100" onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setOpenAuth(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition shadow-md hover:shadow-lg group"
            >
              <LogIn
                size={16}
                className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
              />
              <span className="group-hover:underline transition-all">Login</span>
            </button>
          )}

          <AuthModal isOpen={openAuth} onClose={() => setOpenAuth(false)} />
        </div>

      </div>
    </header>
  );
};

export default Navbar;
