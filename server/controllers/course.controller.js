import { Course } from "../models/course.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;
    let course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found !" });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      // upload thumbnail on cloudinary
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit course",
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not Found !!",
      });
    }
    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course by id",
    });
  }
};
