import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, getUser } from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Register validation
const registerValidation = [
  body("name", "Name is required").not().isEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
];

// Login validation
const loginValidation = [
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password is required").exists(),
];

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post("/register", registerValidation, registerUser);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", loginValidation, loginUser);

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, getUser);

export default router;