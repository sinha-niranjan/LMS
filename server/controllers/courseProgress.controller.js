import { CourseProgress } from "../models/courseProgress.model.js";
import { Course } from "../models/course.model.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    // step-1 : fetch the user course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");
    const courseDetails = await Course.findById(courseId);

    if (!courseDetails) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // step-2 : If no progress found, return course details with an empty progress
    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }

    // step-3 : Return the user's course progress along with course details
    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    // fetch or create course progress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");

    // step-2 : If no progress found, return course details with an empty progress
    if (!courseProgress) {
      courseProgress = await new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }

    //   find the lecture progress in the course progress
    let lectureIndex = courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    if (lectureIndex !== -1) {
      // if lecture already exist update it's status
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      // add new lecture progress
      courseProgress.lectureProgress.push({ lectureId, viewed: false });
    }

    // if all lecture is completed
    const lectureProgressLength = courseProgress.lectureProgress.filter(
      (lectureProg) => lectureProg.viewed
    ).length;

    const course = await Course.findById(courseId);
    if (course.lectures.length === lectureProgressLength)
      courseProgress.completed = true;

    await courseProgress.save();

    return res.status(200).json({
      messae: "Lecture progress updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
