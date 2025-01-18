import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Course = () => {
  return (
    <Card className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-800">
      <div className="relative">
        <img
          src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
          alt="course image"
          className="h-36 w-full rounded-t-lg object-cover"
        />
      </div>
      <CardContent className="space-y-3 px-5 py-4">
        <h1 className="truncate text-lg font-bold hover:underline">
          Next js Complete Course in Hindi{" "}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="http://github.com/shadcn.png" alt="logo" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-sm font-medium">Niranjan Kumar</h1>
          </div>
          <Badge
            className={
              "rounded-full bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-800"
            }
          >
            Advance
          </Badge>
        </div>
        <div>
          <span className="text-lg font-bold">₹499</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
