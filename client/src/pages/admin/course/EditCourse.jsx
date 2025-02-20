import { Button } from "@/components/ui/button";
import CourseTab from "@/pages/admin/course/CourseTab";
import React from "react";
import { Link } from "react-router-dom";

const EditCourse = () => {
  return (
    <div className="flex-1">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          Add detail information regarding course{" "}
        </h1>
        <Link to={"lecture"}>
          <Button className="hover:text-blue-900" variant="link">
            Go to lectures page
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
