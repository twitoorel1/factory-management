import express from 'express';
import catchAsyncError from '@/errors/catchAsyncError';
import shiftController from '@/controllers/shift.controllers';
const router = express.Router();

router.route('/').get(catchAsyncError(shiftController.getAll)).post(catchAsyncError(shiftController.createOne));
router.route('/one/:shiftId').get(catchAsyncError(shiftController.getOneById)).patch(catchAsyncError(shiftController.updateOneById)).delete(catchAsyncError(shiftController.deleteOneById));

router.get('/shiftsByEmployeeId/:employeeId', catchAsyncError(shiftController.getShiftsByEmployeeId));
router.get('/shiftsByDepartmentId/:departmentId', catchAsyncError(shiftController.getShiftsByDepartmentId));

export default router;
