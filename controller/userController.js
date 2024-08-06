import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register Employe
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      res.status(400).json({
        success: false,
        message: "Please fill every details",
      })
    );
  }
  const ifuser = await User.findOne({ email });
  if (ifuser) {
    return next(
      res.status(400).json({
        success: true,
        message: "User already exist",
      })
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(200).json({
    success: true,
    message: "Register Successfully",
    user,
  });
};

//Login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      res.status(400).json({
        success: false,
        message: "Please fill all inputs",
      })
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      res.status(400).json({
        success: false,
        message: "Invalid Email and Password",
      })
    );
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(
      res.status(404).json({
        success: false,
        message: "Invalid Email and Password",
      })
    );
  }
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      message: "User Logged In",
      user,
      token,
    });
};

//GetUser
export const getUser = async (req, res, next) => {
  //How this line work you get the user Id from the middle ware
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(
      res.status(404).json({
        success: false,
        message: "User not found",
      })
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
};

// Logout
export const logOut = async (req, res, next) => {
  res.status(200).cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success:true,
    messsage:"User Logged Out"
  });
};
