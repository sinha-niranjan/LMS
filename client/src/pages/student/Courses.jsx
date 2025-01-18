import { Skeleton } from "@/components/ui/skeleton";
import Course from "@/pages/student/Course";
import React from "react";

const courses = [1, 2, 3, 4, 5];

const Courses = () => {
  const isLoading = false;
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl p-6">
        <h2 className="mb-10 text-center text-3xl font-bold"> Our Courses</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : courses.map((course, index) => <Course key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      <Skeleton className="h-36 w-full" />
      <div className="space-y-3 px-5 py-4">
        <Skeleton className={"h-6 w-3/4"} />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className={"h-6 w-6 rounded-full"} />
            <Skeleton className={"h-4 w-20"} />
          </div>
          <Skeleton className={"h-4 w-16"} />
        </div>
        <Skeleton className={"h-4 w-1/4"} />
      </div>
    </div>
  );
};
