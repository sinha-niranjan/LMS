import LoadingSpinner from "@/components/LoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  if (!course) return <LoadingSpinner />;
  console.log(course);
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-800">
        <div className="relative">
          <img
            src={course?.courseThumbnail}
            alt="course image"
            className="h-36 w-full rounded-t-lg object-cover"
          />
        </div>
        <CardContent className="space-y-3 px-5 py-4">
          <h1 className="truncate text-lg font-bold hover:underline">
            {course?.courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={course?.creator?.photoUrl}
                  alt={course?.creator?.name}
                />
                <AvatarFallback>
                  {`${course?.creator.name.split(" ")[0][0]} ${course?.creator?.name.split(" ")[1][0]}`}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-sm font-medium">{course?.creator?.name}</h1>
            </div>
            <Badge
              className={
                "rounded-full bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-800"
              }
            >
              {course?.courseLevel}
            </Badge>
          </div>
          <div>
            <span className="text-lg font-bold">₹{course?.coursePrice}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
