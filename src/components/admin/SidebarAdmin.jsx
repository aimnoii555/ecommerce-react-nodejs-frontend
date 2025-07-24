import { NavLink } from "react-router-dom";
import {
  CircleGauge,
  FolderKanban,
  ListOrdered,
  LogOut,
  PackageSearch,
  ShoppingCart,
} from "lucide-react";
import { Image } from "react";

const SidebarAdmin = () => {
  return (
    <div className="bg-gray-800 w-64 text-gray-100 flex flex-col h-screen">
      <div className="px-5 h-24 bg-gray-900 flex items-center justify-center text-2xl font-bold">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Facebook_logo_%282023%29.svg/2560px-Facebook_logo_%282023%29.svg.png"
          alt=""
        />
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          end
          to={"/admin"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white rounded-md hover:bg-gray-700 flex items-center gap-2 px-4 py-2"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center gap-2"
          }
        >
          <CircleGauge />
          Dashboard
        </NavLink>
        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white rounded-md hover:bg-gray-700 flex items-center gap-2 px-4 py-2"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center gap-2"
          }
        >
          <FolderKanban />
          Manage
        </NavLink>
        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white rounded-md hover:bg-gray-700 flex items-center gap-2 px-4 py-2"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center gap-2"
          }
        >
          <PackageSearch />
          Category
        </NavLink>
        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white rounded-md hover:bg-gray-700 flex items-center gap-2 px-4 py-2"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center gap-2"
          }
        >
          <ShoppingCart />
          Products
        </NavLink>
        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white rounded-md hover:bg-gray-700 flex items-center gap-2 px-4 py-2"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center gap-2"
          }
        >
          <ListOrdered />
          Orders
        </NavLink>
      </nav>

      <div>
        <NavLink
          to={"logout"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 text-white rounded-md hover:bg-gray-700 flex items-center gap-2 px-4 py-2"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center gap-2"
          }
        >
          <LogOut />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;
