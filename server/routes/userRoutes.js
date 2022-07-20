const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controler/userControler");
const {protect}= require('../middleWare/authMiddle')
const router = express.Router();
const multerMiddleware = require("../middleWare/multer");
// console.log(registerUser);

router.post("/", multerMiddleware.single("pic"), registerUser);
router.get("/", allUsers);

router.post("/login",protect, authUser);

module.exports = router;
