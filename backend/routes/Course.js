const express = require("express");
const router = express.Router();
const  {protect}  = require("../middleware/auth");
const { upload } = require("../utils/fileUpload");
const {
    fetchAllUsersCourses,
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
} = require('../controllers/Course');


router.route("/fetchallcourses").get(protect, fetchAllUsersCourses);
router.route("/course").post(protect, upload.single("image"), createCourse);
router.route("/course/:id").patch(protect, upload.single("image"), updateCourse);
router.route("/course").get(protect, getCourses);
router.route("/course/:id").get(protect, getCourse);
router.route("/course/:id").delete(protect, deleteCourse);

module.exports = router;




