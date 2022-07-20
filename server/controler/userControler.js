const asyncHandler = require("express-async-handler");
const User = require("../modules/userModel");
const generateToken = require("../config/generateToken");


exports.registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
    const { name, email, password, pic } = req.body;
    // console.log( "Const Eleemnets", name, email, password, pic);
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      pic :  req.file.originalname,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });



  exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user._id),
      });
      console.log("user Login",user.name)
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

  exports.allUsers = asyncHandler(async (req, res) => {
  console.log("all user ",req.body)
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});