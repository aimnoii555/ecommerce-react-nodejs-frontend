import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const Layout = () => {
  return (
    <div>
      <MainNav />
      <main className="h-full mt-2 px-4 mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
