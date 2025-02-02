import { Course } from "../models/course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;

    if (!courseTitle || !courseTitle)
      return res.status(400).json({
        message: "Course Title ans Category is required",
      });

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "failed to create course",
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({
      creator: userId,
    });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "Course not found",
      });
    }

    return res.status(200).json({
      courses,
      message: " courses found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "failed to get all courses",
    });
  }
};
