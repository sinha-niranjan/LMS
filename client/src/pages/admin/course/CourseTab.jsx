import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "../../../features/api/courseApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const CourseTab = () => {
  const params = useParams();
  const courseId = params.courseId;
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const navigate = useNavigate();
  const {
    data: getCourseData,
    isLoading: getCourseIsLoading,
    isSuccess: getCourseIsSuccess,
    refetch,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();
  const [publishCourse] = usePublishCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  // get file
  const selectThumbnaiL = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };
  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formData, courseId });
  };
  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || `Course updated successfully`);
    }
    if (error) {
      toast.error(error.message || `Failed to update course`);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (getCourseData?.course) {
      const course = getCourseData?.course;
      setInput({
        courseTitle: course?.courseTitle || "",
        subTitle: course?.subTitle || "",
        description: course?.description || "",
        category: course?.category || "",
        courseLevel: course?.courseLevel || "",
        coursePrice: course?.coursePrice || "",
        courseThumbnail: course?.courseThumbnail || "",
      });
      setPreviewThumbnail(course?.courseThumbnail || "");
    }
  }, [getCourseData]);

  if (getCourseIsLoading) return <Loader2 className="animate-spin" />;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.{" "}
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            disabled={getCourseData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                getCourseData?.course?.isPublished ? false : true,
              )
            }
          >
            {getCourseData?.course?.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-5 space-y-4">
          <div>
            <Label> Title</Label>
            <Input
              type="text"
              placeholder="Ex. Fullstack developer"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
            />
          </div>{" "}
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              placeholder="Ex. Become a Fullstack developer from zero to hero in two months."
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <label>Description</label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next Js">Next Js</SelectItem>
                    <SelectItem value="React Js">React Js</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="Aws">Aws</SelectItem>{" "}
                    <SelectItem value="CSS">CSS</SelectItem>{" "}
                    <SelectItem value="HTML">HTML</SelectItem>{" "}
                    <SelectItem value="Tailwind CSS">Tailwind CSS</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select
                value={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>{" "}
                    <SelectItem value="Medium">Medium</SelectItem>{" "}
                    <SelectItem value="Advance CSS">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                placeholder="Ex. 1000"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-fit"
              onChange={selectThumbnaiL}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Course Thumbnail"
                className="my-2 w-64 object-cover"
              />
            )}
          </div>
          <div>
            <Button variant="outline" onClick={() => navigate("/admin/course")}>
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
