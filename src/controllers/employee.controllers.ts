import { NextFunction, Request, Response } from 'express';
import Employee from '@/models/employee.models';
import { NotFoundError } from '@/errors/Errors';
import EmployeeValidator from '@/validators/validateBody.schema';
import errorHandlerYup from '@/errors/errorHandlerYup';
import errorHandler from '@/errors/errorHandler';

async function createOne(req: Request, res: Response, next: NextFunction) {
	try {
		await EmployeeValidator.EmployeeCreateOneRequestSchema.validate(req.body, { abortEarly: false });
		const { first_name, last_name, start_work_year, department_id } = req.body;
		const createOneResponse = await Employee.createOne(first_name, last_name, start_work_year, department_id);
		res.status(201).send({ error: false, data: createOneResponse });
	} catch (error: any) {
		if (error.name === 'ValidationError') {
			return errorHandlerYup(error, req, res, next);
		}
		if (error.name) {
			return errorHandler(error, req, res, next);
		}
		console.log(error.message);
	}
}

async function getAll(req: Request, res: Response, next: NextFunction) {
	try {
		const getAllResponse = await Employee.findAll();
		if (getAllResponse.length === 0) return next(new NotFoundError('Employees not found'));
		res.status(200).send({ error: false, data: getAllResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Get All Employees' });
	}
}

async function getOneById(req: Request, res: Response, next: NextFunction) {
	try {
		const getOneByIdResponse = await Employee.findOneById(Number(req.params.employeeId));
		if (getOneByIdResponse === undefined || getOneByIdResponse === null) return next(new NotFoundError('Employee not found'));
		res.status(200).send({ error: false, data: getOneByIdResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Get One Employee' });
	}
}

async function updateOneById(req: Request, res: Response, next: NextFunction) {
	try {
		await EmployeeValidator.EmployeeUpdateOneRequestSchema.validate(req.body, { abortEarly: false });
		const updateOneByIdResponse = await Employee.updateOneById(Number(req.params.employeeId), req.body);
		if (updateOneByIdResponse.affectedRows === 0) return next(new NotFoundError('Employee not found'));
		res.status(200).send({ error: false, data: updateOneByIdResponse });
	} catch (error: any) {
		if (error.name === 'ValidationError') {
			return errorHandlerYup(error, req, res, next);
		}
		if (error.name) {
			return errorHandler(error, req, res, next);
		}
		console.log(error.message);
	}
}

async function deleteOneById(req: Request, res: Response, next: NextFunction) {
	try {
		const deleteOneByIdResponse = await Employee.deleteOneById(Number(req.params.employeeId));
		if (deleteOneByIdResponse.affectedRows === 0) return next(new NotFoundError('Employee not found'));
		res.status(200).send({ error: false, data: deleteOneByIdResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Delete One Employee' });
	}
}

// Read all employees who do not belong to the department
async function getAllEmployeesNotWorkingInDepartment(req: Request, res: Response, next: NextFunction) {
	try {
		const getAllResponse = await Employee.findAllEmployeesNotWorkingInDepartment(+req.params.departmentId);
		if (getAllResponse.length === 0) return next(new NotFoundError('Employees not found'));
		res.status(200).send({ error: false, data: getAllResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Get All Employees' });
	}
}

export default { createOne, getAll, getOneById, updateOneById, deleteOneById, getAllEmployeesNotWorkingInDepartment };
