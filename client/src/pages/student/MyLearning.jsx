import Course from "@/pages/student/Course";
import React from "react";

const MyLearning = () => {
  const isLoading = false;
  const myLearningCourses = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="mx-auto my-24 max-w-4xl px-4 md:px-0">
      <h1 className="text-2xl font-bold">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearningCourses.length === 0 ? (
          <p>You are not enrolled in any course .</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {myLearningCourses?.map((course, index) => (
              <Course key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="h-40 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"
      ></div>
    ))}
  </div>
);
