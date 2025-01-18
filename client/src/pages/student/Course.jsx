import { Card } from "@/components/ui/card";
import React from "react";

const Course = () => {
  return (
    <Card classname=" overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
          alt="course image"
          className="h-36 w-full rounded-t-lg object-cover"
        />
      </div>
      Course
    </Card>
  );
};

export default Course;
