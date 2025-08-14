import { errors } from "@upstash/redis";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @route POST /api/auth/register
export const registerUser = async (req, res) => {
  const { name, email, passwordHash, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({
    name,
    email,
    passwordHash: passwordHash,
    role: role || "User",
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

// @route POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, passwordHash } = req.body;
  try {
    const user = await User.findOne({ email });
    // console.log("User found:",password);
    if (user && user.passwordHash === passwordHash) {
      res.json({
        message: "Login successful",
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    //   console.error(error);
    }
  } catch (error) {
    console.error("Login Error:", error);
  }
};

// @route GET /api/auth/me
export const getMe = async (req, res) => {
  res.json(req.user);
};

// @route POST /api/auth/logout
export const logoutUser = async (req, res) => {
  res.json({ message: "Logout successful" });
};
