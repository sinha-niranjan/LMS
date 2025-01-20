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
import { useLoadUserQuery } from "@/features/api/authApi";
import Course from "@/pages/student/Course";
import { UserMinus } from "lucide-react";
import { Loader2 } from "lucide-react";
import React from "react";

const Profile = () => {
  const { data, isLoading } = useLoadUserQuery();

  if (isLoading) {
    return <h1> Profile Loading ..... </h1>;
  }
  const { user } = data;
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
                    type="text"
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>{" "}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isLoading}>
                  {isLoading ? (
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
