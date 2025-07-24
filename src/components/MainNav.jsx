import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { History, Menu, X } from "lucide-react";
import useBearProvider from "../providers/Provider";

const MainNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const useStore = useBearProvider((state) => state);
  const [isDropdown, setIsDropdown] = useState(false);


  const toggleOpenDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <nav className="bg-green-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-green-800">
            <Link to="/">Logo</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink
              to="/"
              className={
                (`hover:text-green-700 font-medium`,
                ({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-1 rounded-md text-sm"
                    : "hover:text-green-700 font-medium")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={
                (`hover:text-green-700 font-medium`,
                ({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-1 rounded-md text-sm"
                    : "hover:text-green-700 font-medium")
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/cart"
              className={
                (`hover:text-green-700 font-medium`,
                ({ isActive }) =>
                  isActive
                    ? "bg-gray-200 px-3 py-1 rounded-md text-sm "
                    : "hover:text-green-700 font-medium")
              }
            >
              Cart
              {useStore.carts.length > 0 && (
                <span className="absolute top-0 text-white bg-red-500 rounded-full px-1.5">
                  {useStore.carts.length}
                </span>
              )}
            </NavLink>

            {useStore.user ? (
              <div className="relative">
                <button onClick={toggleOpenDropdown}>
                  <img
                    className="w-9"
                    src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                  ></img>
                </button>
                {isDropdown && (
                  <div className="absolute z-10 top-8 right-0  shadow-md mt-2 bg-white ">
                    <Link
                      to={"/user/history"}
                      className="block py-2 px-8 hover:bg-gray-200"
                    >
                      History
                    </Link>
                    <button onClick={() => useStore.logout()}>
                      <Link className="block py-2 px-8 hover:bg-gray-200">
                        Logout
                      </Link>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="gap-4 flex">
                <NavLink
                  to="/register"
                  className={
                    (`hover:text-green-700 font-medium`,
                    ({ isActive }) =>
                      isActive
                        ? "bg-gray-200 px-3 py-1 rounded-md text-sm"
                        : "hover:text-green-700 font-medium")
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className={
                    (`hover:text-green-700 font-medium`,
                    ({ isActive }) =>
                      isActive
                        ? "bg-gray-200 px-3 py-1 rounded-md text-sm"
                        : "hover:text-green-700 font-medium")
                  }
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-green-800"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-green-700"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className="block text-green-700"
            >
              Shop
            </Link>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="block text-green-700"
            >
              Cart
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="block text-green-700"
            >
              Register
            </Link>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-green-700"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
