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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const params = useParams();
  const courseId = params.courseId;
  const lectureId = params.lectureId;
  const [editLecture, { data, isSuccess, isLoading, error }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          console.log(res.data);
          setUploadVideoInfo({
            videoUrl: res.data?.data?.url,
            publicId: res.data?.data?.public_id,
          });
          setBtnDisabled(false);
          toast.success(res.data.message || "Video Uploaded successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Failed to upload video");
      } finally {
        setMediaProgress(false);
      }
    }
  };
  const editLectureHandler = async () => {
    try {
      await editLecture({
        lectureTitle: title,
        videoInfo: uploadVideoInfo,
        isPreviewFree: isFree,
        courseId,
        lectureId,
      });
    } catch (error) {}
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Video Uploaded successfully");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update video");
    }
  }, [isSuccess, error]);
  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message || "Lecture removed successfully");
    }
  }, [removeSuccess]);

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make Changes and click when done .</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={removeLoading}
            variant="destructive"
            onClick={removeLectureHandler}
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label> Title</Label>
          <Input
            type="text"
            placeholder="Ex. Introduction to Javascript"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="my-5">
          <Label>
            {" "}
            Video<span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            className="w-fit"
            onChange={fileChangeHandler}
          />
        </div>
        <div className="my-5 flex items-center space-x-2">
          <Switch
            id="free-video"
            checked={isFree}
            onCheckedChange={setIsFree}
          />
          <Label htmlFor="free-video">Is this video FREE</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button
            disabled={mediaProgress || isLoading}
            onClick={editLectureHandler}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
