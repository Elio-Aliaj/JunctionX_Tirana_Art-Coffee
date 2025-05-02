import jwt from "jsonwebtoken"
import User from "./models/User.js"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js"

export const createUser = async (userData) => {
  try {
    const { name, email, password, role } = userData

    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      throw new Error("User already exists")
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "client",
    })

    return user
  } catch (error) {
    throw error
  }
}

export const authenticateUser = async (email, password) => {
  try {
    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error("Invalid credentials")
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      throw new Error("Invalid credentials")
    }

    return user
  } catch (error) {
    throw error
  }
}

export const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}
