import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import Course from "@/pages/student/Course";
import { Loader2 } from "lucide-react";
import { use } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError: updateUserIsError,
      error: updateUserError,
      isSuccess: updateUserIsSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };
  useEffect(() => {
    if (!updateUserIsLoading && updateUserIsSuccess) {
      refetch();
      toast.success(updateUserData.message || "Profile updated successfully");
    }

    if (!updateUserIsLoading && updateUserIsError)
      toast.error(updateUserError.message || "Profile not updated");
  }, [updateUserIsSuccess, updateUserIsError, updateUserData, updateUserError]);
  if (isLoading) {
    return <h1> Profile Loading ..... </h1>;
  }

  const user = data && data?.user;
  const updateUserHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
    setName("");
    setProfilePhoto("");
  };

  return (
    <div className="mx-auto my-24 max-w-4xl px-4">
      <h1 className="text-center text-2xl font-bold md:text-left">PROFILE</h1>
      <div className="my-5 flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="flex flex-col items-center">
          <Avatar className="mb-4 h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={user?.photoUrl} alt={user.name} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:{" "}
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                {user.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:{" "}
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                {user.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:{" "}
              <span className="ml-2 font-normal text-gray-700 dark:text-gray-300">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle> Edit Profile</DialogTitle>
                <DialogDescription>
                  Make Changes to your profile here. Click save when you are
                  done .
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>{" "}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isLoading} onClick={updateUserHandler}>
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait ...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-medium">Courses you're enrolled in</h1>
        <div className="my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {user.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user.enrolledCourses.map((course, index) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
