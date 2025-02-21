import { SquareLibrary } from "lucide-react";
import { ChartNoAxesColumn } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="sticky top-0 hidden h-screen w-[250px] space-y-8 border-r border-r-gray-300 bg-[#f0f0f0] p-5 dark:border-r-gray-700 sm:w-[300px] lg:block">
        <div className="mt-20 space-y-4">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="/admin/course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="max-w-7xl flex-1 bg-white p-2 md:p-24">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
