import { Button } from "@/components/ui/button";
import LectureTab from "@/pages/admin/lecture/LectureTab";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to={`/admin/course/${courseId}/lecture`}>
            {" "}
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Update Your Lecture</h1>
        </div>
      </div>
      <LectureTab />
    </>
  );
};

export default EditLecture;
