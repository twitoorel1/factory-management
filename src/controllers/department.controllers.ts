import { NextFunction, Request, Response } from 'express';
import Department from '@/models/department.models';
import { NotFoundError } from '@/errors/Errors';
import DepartmentValidator from '@/validators/validateBody.schema';
import errorHandlerYup from '@/errors/errorHandlerYup';
import errorHandler from '@/errors/errorHandler';

async function createOne(req: Request, res: Response, next: NextFunction) {
	try {
		await DepartmentValidator.departmentCreateOneRequestSchema.validate(req.body, { abortEarly: false });
		const createOneResponse = await Department.createOne(req.body.name, req.body.manager);
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
		const getAllResponse = await Department.findAll();
		if (getAllResponse.length === 0) return next(new NotFoundError('Departments not found'));
		res.status(200).send({ error: false, data: getAllResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Get All Departments' });
	}
}

async function getOneById(req: Request, res: Response, next: NextFunction) {
	try {
		const getOneByIdResponse = await Department.findOneById(Number(req.params.departmentId));
		if (getOneByIdResponse === undefined || getOneByIdResponse === null) return next(new NotFoundError('Department not found'));
		res.status(200).send({ error: false, data: getOneByIdResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Get One Department' });
	}
}

async function updateOneById(req: Request, res: Response, next: NextFunction) {
	try {
		await DepartmentValidator.departmentUpdateOneRequestSchema.validate(req.body, { abortEarly: false });
		const updateOneByIdResponse = await Department.updateOneById(Number(req.params.departmentId), req.body);
		if (updateOneByIdResponse.affectedRows === 0) return next(new NotFoundError('Department not found'));
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
		const deleteOneByIdResponse = await Department.deleteOneById(Number(req.params.departmentId));
		if (deleteOneByIdResponse.affectedRows === 0) return next(new NotFoundError('Department not found'));
		res.status(200).send({ error: false, data: deleteOneByIdResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Delete One Department' });
	}
}

export default { createOne, getAll, getOneById, updateOneById, deleteOneById };
