import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLectureMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const courseId = params.courseId;

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();
  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture created successfully");
    }
    if (error) {
      toast.error(error.data.message || "Lecture not created ");
    }
  }, [isSuccess, error]);
  return (
    <div className="mx-10 flex-1">
      <div className="mb-4">
        <h1 className="text-xl font-bold">
          Let's add lecture, add some basic lecture details for your new
          lecture.
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          rem!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Your Lecture Title Name"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/course/" + courseId)}
          >
            {" "}
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {" "}
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
