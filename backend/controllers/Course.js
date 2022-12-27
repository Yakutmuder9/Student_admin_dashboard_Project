const asyncHandler = require("express-async-handler");
const Course = require("../models/Course");
const User = require("../models/User");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("../utils/cloudinary");


//get courses
const fetchAllUsersCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().sort("-createdAt");
  res.status(200).json(courses);
});


//Create course
const createCourse = asyncHandler(async (req, res) => {
  const { description, like, share, comments, image } = req.body;
 
  //   Validation
  // if (!description || !req.file) {
  //   res.status(400);
  //   throw new Error("Please fill in all fields");
  // }

  // Handle Image upload 
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }
  try {
    // Create course
    const course = await Course.create({
      user: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profile_pic: req.user.profile_pic,
      description,
      like,
      share,
      comments,
      image: fileData
    });
  console.log(course)
    res.status(201).json(course);
  } catch (error) {
    res.status(500);
    throw new Error("Dupplicate Error");
  }

});


//get courses
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(courses);
});

//get course
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  // if course doesnt exist
  if (!course) {
    res.status(404);
    throw new Error("course not found");
  }
  // Match course to its user
  if (course.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(course);
});

//update course
const updateCourse = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const course = await Course.findById(id);

  // if course doesnt exist
  if (!course) {
    res.status(404);
    throw new Error("course not found");
  }
  // Match course to its user
  if (course.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update course
  const updatedCourse = await Course.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? course?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedCourse);
});

//Delete course
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  // if course doesnt exist
  if (!course) {
    res.status(404);
    throw new Error("course not found");
  }
  // Match course to its user
  if (course.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await course.remove();
  res.status(200).json({ message: "course deleted." });
});

module.exports = {fetchAllUsersCourses, createCourse, getCourses, getCourse, updateCourse, deleteCourse };