import { School } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 h-16 border-b border-b-gray-200 bg-white duration-300 dark:border-b-gray-800 dark:bg-[#0A0A0A]">
      {/* Desktop */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between md:flex">
        <School size={"30"} />
        <h1 className="hidden text-2xl font-extrabold md:block">E-Learning</h1>
      </div>
    </div>
  );
};

export default Navbar;
