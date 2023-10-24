import express from 'express';
import catchAsyncError from '@/errors/catchAsyncError';
import employeeController from '@/controllers/employee.controllers';
const router = express.Router();

router.route('/').get(catchAsyncError(employeeController.getAll)).post(catchAsyncError(employeeController.createOne));
router.route('/one/:employeeId').get(catchAsyncError(employeeController.getOneById)).patch(catchAsyncError(employeeController.updateOneById)).delete(catchAsyncError(employeeController.deleteOneById));

router.get('/getAllEmployeesNotWorkingInDepartment/:departmentId', catchAsyncError(employeeController.getAllEmployeesNotWorkingInDepartment));

export default router;
