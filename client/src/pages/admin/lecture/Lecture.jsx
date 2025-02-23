import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, index, courseId }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`/admin/course/${courseId}/lecture/${lecture._id}`);
  };
  return (
    <div className="my-2 flex items-center justify-between rounded-md bg-[#F7F9FA] px-4 py-2 dark:bg-[#1F1F1F]">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        Lecture - {index + 1}: {lecture.lectureTitle}
      </h1>
      <Edit
        onClick={goToUpdateLecture}
        size={20}
        className="cursor-pointer text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
      />
    </div>
  );
};

export default Lecture;
