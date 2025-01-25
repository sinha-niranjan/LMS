import { LoaderCircleIcon } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <LoaderCircleIcon className="h-16 w-16 animate-spin text-blue-600" />
      <p className="mt-4 text-lg font-semibold text-gray-700">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingSpinner;
