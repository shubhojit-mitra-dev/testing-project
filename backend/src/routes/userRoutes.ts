import express from 'express';
import { createUser, getUsers } from '../controllers/userController';

const router = express.Router();

// User routes
router.route('/')
  .post(createUser)    // POST /api/users
  .get(getUsers);      // GET /api/users

export default router;
