import express, { Request, Response, NextFunction } from 'express';
import { getAllUsers, getUserById, deleteUser } from '../controllers/adminController';

const router = express.Router();

// Simplified error wrapper
const asyncHandler = (fn: Function) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

// Admin routes
router.route('/users')
  .get(asyncHandler(getAllUsers));

router.route('/users/:id')
  .get(asyncHandler(getUserById))
  .delete(asyncHandler(deleteUser));

// 404 handler
router.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Admin route not found'
  });
});

export default router;
