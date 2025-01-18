import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const HeroSection = () => {
  return (
    <div className="dark relative bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-24 text-center dark:from-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold text-white">
          Find the Best Courses for You
        </h1>
        <p className="mb-8 text-gray-200 dark:text-gray-400">
          {" "}
          Discover, Learn and Upskill with our wide range of course{" "}
        </p>
        <form className="mx-auto mb-6 flex max-w-xl items-center overflow-hidden rounded-full bg-white shadow-lg dark:bg-gray-800">
          <Input
            type="text"
            className="flex-grow overflow-hidden rounded-full border-none p-6 text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 dark:text-gray-100 dark:placeholder:text-gray-500"
            placeholder="Search for courses"
          />
          <Button className="rounded-r-full bg-blue-600 px-6 py-6 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
            Search
          </Button>
        </form>
        <Button className="rounded-full bg-white text-blue-600 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-800">
          {" "}
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
