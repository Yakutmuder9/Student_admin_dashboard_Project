const express = require("express");
const router = express.Router();
const  { protect }  = require("../middleware/auth");
const { upload } = require("../utils/fileUpload");
const {
    getUser, 
    updateUser,
    updateTheme,
    deleteUser,
    getAllUsersUsers,
} = require('../controllers/User');
const { IsSupperAdmin, IsInstructor, IsStudent} = require("../middleware/auth")

router.route("/getallusers").get(protect, getAllUsersUsers);
router.route("/getuser").get(protect, getUser);
router.route("/updateuser").patch(protect, upload.single("image"), updateUser);
router.route("/theme").patch(protect, updateTheme);
router.route("/deleteuser").delete(protect, deleteUser);

module.exports = router;




