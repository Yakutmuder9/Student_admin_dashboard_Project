const asyncHandler = require("express-async-handler");
const Book = require("../models/Book");
const User = require("../models/User");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("../utils/cloudinary");


//get books
const fetchAllUsersBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().sort("-createdAt");
  res.status(200).json(books);
});


//Create book
const createBook = asyncHandler(async (req, res) => {
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
    // Create book
    const book = await Book.create({
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
  console.log(book)
    res.status(201).json(book);
  } catch (error) {
    res.status(500);
    throw new Error("Dupplicate Error");
  }

});


//get books
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(books);
});

//get book
const getBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  // if book doesnt exist
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }
  // Match book to its user
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(book);
});

//update book
const updateBook = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const book = await Book.findById(id);

  // if book doesnt exist
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }
  // Match book to its user
  if (book.user.toString() !== req.user.id) {
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

  // Update book
  const updatedBook = await Book.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? book?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedBook);
});

//Delete book
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  // if book doesnt exist
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }
  // Match book to its user
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await book.remove();
  res.status(200).json({ message: "book deleted." });
});

module.exports = {fetchAllUsersBooks, createBook, getBooks, getBook, updateBook, deleteBook };