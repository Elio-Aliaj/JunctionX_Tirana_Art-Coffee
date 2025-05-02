import User from "./models/User.js"

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (owner only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Not authorized for this role
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password")
    res.json(users)
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID (owner and worker only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *       403:
 *         description: Not authorized for this role
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user (owner can update any user, users can update themselves)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [owner, worker, client]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Not authorized
 */
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if user is updating themselves or is an owner
    if (req.user.role !== "owner" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "Not authorized to update this user" })
    }

    // Only owner can change roles
    if (req.body.role && req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owners can change user roles" })
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    // Only update role if provided and user is owner
    if (req.body.role && req.user.role === "owner") {
      user.role = req.body.role
    }

    // Update password if provided
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (owner only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Not authorized for this role
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    await User.deleteOne({ _id: req.params.id })
    res.json({ message: "User removed" })
  } catch (error) {
    next(error)
  }
}
