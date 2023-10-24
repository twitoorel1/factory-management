import express from 'express';
import catchAsyncError from '@/errors/catchAsyncError';
import userController from '@/controllers/user.controllers';
const router = express.Router();

router.get('/allUsers', catchAsyncError(userController.allUsers));

export default router;
