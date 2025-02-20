import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const EditCourse = () => {
  return (
    <div className="flex-1">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          Add detail information regarding course{" "}
        </h1>
        <Link>
          <Button variant="link">Go to lectures page</Button>
        </Link>
      </div>
    </div>
  );
};

export default EditCourse;
