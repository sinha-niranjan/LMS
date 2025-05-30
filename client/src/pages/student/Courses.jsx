import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import Course from "@/pages/student/Course";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  console.log(data?.courses);
  if (isError) return <h1>Some error occured wile fetching the courses</h1>;
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl p-6">
        <h2 className="mb-10 text-center text-3xl font-bold"> Our Courses</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses?.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg">
      <Skeleton className="h-36 w-full" />
      <div className="space-y-3 px-5 py-4">
        <Skeleton className={"h-6 w-3/4"} />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className={"h-6 w-6 rounded-full"} />
            <Skeleton className={"h-4 w-20"} />
          </div>
          <Skeleton className={"h-4 w-16"} />
        </div>
        <Skeleton className={"h-4 w-1/4"} />
      </div>
    </div>
  );
};
