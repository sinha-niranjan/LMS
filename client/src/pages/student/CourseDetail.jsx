import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LockIcon } from "lucide-react";
import { Lock } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { BadgeInfo } from "lucide-react";
import React from "react";

const CourseDetail = () => {
  const purchasedCourse = false;
  return (
    <div className="mt-18 space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 md:px-8">
          <h1 className="text-2xl font-bold md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg">Course Sub-title</p>
          <p>
            Created By{" "}
            <span className="italic text-[#C0C4FC] underline">
              Niranjan Kumar
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated 11-11-2024</p>
          </div>
          <p>Students enrolled: 10</p>
        </div>
      </div>
      <div className="mx-auto my-5 flex max-w-7xl flex-col gap-10 px-4 md:px-8 lg:flex-row">
        <div className="w-full space-y-5 lg:w-1/2">
          <h1 className="text-xl font-bold md:text-2xl">Description</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            deserunt assumenda ad, explicabo culpa eveniet ratione expedita
            voluptate maxime magnam incidunt earum odit placeat illum illo
            tempore inventore aut ullam obcaecati facere? Voluptatibus, totam.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 lectures</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {[1, 2, 3].map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>lecture title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="flex flex-col p-4">
              <div className="mb-4 aspect-video w-full">
                {" "}
                React Player video ayega
              </div>
              <h1>Lecture Title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg font-semibold md:text-xl">
                Course Price{" "}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchasedCourse ? (
                <Button>Continue Course</Button>
              ) : (
                <BuyCourseButton />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
