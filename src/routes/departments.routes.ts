import express from 'express';
import catchAsyncError from '@/errors/catchAsyncError';
import departmentController from '@/controllers/department.controllers';
const router = express.Router();

router.route('/').get(catchAsyncError(departmentController.getAll)).post(catchAsyncError(departmentController.createOne));
router.route('/one/:departmentId').get(catchAsyncError(departmentController.getOneById)).patch(catchAsyncError(departmentController.updateOneById)).delete(catchAsyncError(departmentController.deleteOneById));

export default router;
