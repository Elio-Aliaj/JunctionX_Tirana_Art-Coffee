import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all users - owner only
router.get('/', protect, authorize('owner'), getUsers);

// Get user by ID - owner and worker can view any user, clients can only view themselves
router.get('/:id', protect, (req, res, next) => {
  // Allow users to access their own profile
  if (req.user._id.toString() === req.params.id) {
    return next();
  }
  // For other profiles, only owners and workers are authorized
  return authorize('owner', 'worker')(req, res, next);
}, getUserById);

// Update user - owners can update any user, users can update themselves
router.put('/:id', protect, updateUser);

// Delete user - owner only
router.delete('/:id', protect, authorize('owner'), deleteUser);

export default router;
