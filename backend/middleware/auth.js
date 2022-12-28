const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

const checkRole = (roles) => (req, res, next) =>
  roles.includes(req.user?.role)
    ? next()
    : res.status(401).send({ message: 'Unauthorized', status: false });


const IsSupperAdmin = function (req, res, next) {
  if (req.user.role !== 'superadmin') {
    const err = new Error('You are not authorized');
    err.status = 403;
    return next(err);
  }
  return next();
};

// const IsSupperAdmin = (req, res)=> {
// try {
//   const sudents = await User.find({ role: "sudent" }).select("-password");
//   res.status(200).json(sudents);
// } catch (error) {
//   res.status(404).json({ message: error.message });
//  }
// };

const IsInstructor = function (req, res, next) {
  if (req.user.role !== 'instructor') {
    const err = new Error('You are not authorized');
    err.status = 403;
    return next(err);
  }

  return next();
};


const IsStudent = function (req, res, next) {
  if (req.user.role !== 'student') {
    const err = new Error('You are not authorized');
    err.status = 403;
    return next(err);
  }
  return next();
};

module.exports = { protect, IsSupperAdmin, IsInstructor, IsStudent };