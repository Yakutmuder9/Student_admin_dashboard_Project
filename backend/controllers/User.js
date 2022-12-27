const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("../utils/cloudinary");


//get users
const fetchAllUsersUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort("-createdAt");
  res.status(200).json(users);
});

//Create user
const createUser = asyncHandler(async (req, res) => {
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
    // Create user
    const user = await User.create({
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
  console.log(user)
    res.status(201).json(user);
  } catch (error) {
    res.status(500);
    throw new Error("Dupplicate Error");
  }

});


//get users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(users);
});

//get user
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  // if user doesnt exist
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  // Match user to its user
  if (user.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(user);
});

//update user
const updateUser = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const user = await User.findById(id);

  // if user doesnt exist
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  // Match user to its user
  if (user.user.toString() !== req.user.id) {
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

  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? user?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedUser);
});

//Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  // if user doesnt exist
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  // Match user to its user
  if (user.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await user.remove();
  res.status(200).json({ message: "user deleted." });
});

module.exports = {fetchAllUsersUsers, createUser, getUsers, getUser, updateUser, deleteUser };