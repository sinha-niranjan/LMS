import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { CirclePlay } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import React from "react";

const CourseProgress = () => {
  const isCompleted = true;
  return (
    <div className="mx-auto mt-20 max-w-7xl p-4">
      {/* Display course name */}
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Course Title</h1>
        <Button>Completed</Button>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Video section */}
        <div className="h-fit flex-1 rounded-lg p-4 shadow-lg md:w-3/5">
          <div>
            {" "}
            {/* video ayega */}
            {/* <Video /> */}
          </div>
          {/* Display  current watching lecture title  */}
          <div className="mt-2">
            <h3 className="text-lg font-medium">Lecture-1: Introduction</h3>
          </div>
        </div>
        {/* Lecture Sidebar  */}
        <div className="flex w-full flex-col border-t border-gray-200 pt-4 md:w-2/5 md:border-l md:border-t-0 md:pl-4 md:pt-0">
          <h2 className="mb-4 text-xl font-semibold">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lecture, index) => (
              <Card
                key={index}
                className="mb-3 transform transition hover:cursor-pointer"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isCompleted ? (
                      <CheckCircle2 size={24} className="mr-2 text-green-500" />
                    ) : (
                      <CirclePlay size={24} className="mr-2 text-gray-500" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        Introduction
                      </CardTitle>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-200 text-green-600"
                  >
                    Completed
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
