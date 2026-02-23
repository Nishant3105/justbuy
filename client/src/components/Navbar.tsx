import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
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
      <div className="max-w-7xl mx-auto px-4 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <div className="flex items-center gap-2" onClick={() => navigate(`/`)}>
          <img src="/logo.png" className="h-8" />
          <span className="font-semibold">JustBuy</span>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <NavbarSearch />
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* <nav className="flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "hover:text-yellow-300"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "hover:text-yellow-300"
              }
            >
              About
            </NavLink>
          </nav> */}

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
                <span className="hidden md:inline">{user?.firstName + " " + user?.lastName}</span>
                <span>{openMenu ? "▲" : "▼"}</span>
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg border border-gray-200 z-50">
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => { navigate("/profile"); setOpenMenu((prev) => !prev) }}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => { navigate("/my-orders"); setOpenMenu((prev) => !prev) }}
                  >
                    My Orders
                  </button>
                  {(user.role === "admin" || user.role === "staff") && <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={() => { navigate("/admin"); setOpenMenu((prev) => !prev) }}
                  >
                    Admin Panel
                  </button>}
                  <button
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setOpenAuth(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Login / Signup
            </button>
          )}


          <AuthModal isOpen={openAuth} onClose={() => setOpenAuth(false)} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
