import { NextFunction, Request, Response } from 'express';
import Shift from '@/models/shift.models';
import { NotFoundError } from '@/errors/Errors';
import ShiftValidator from '@/validators/validateBody.schema';
import errorHandlerYup from '@/errors/errorHandlerYup';
import errorHandler from '@/errors/errorHandler';

async function createOne(req: Request, res: Response, next: NextFunction) {
	try {
		await ShiftValidator.shiftCreateOneRequestSchema.validate(req.body, { abortEarly: false });
		const { date, starting_hour, ending_hour, employees_id } = req.body;
		const createOneResponse = await Shift.createOne(date, starting_hour, ending_hour, employees_id);
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
		const getAllResponse = await Shift.findAll();
		if (getAllResponse.length === 0) return next(new NotFoundError('Shifts not found'));
		res.status(200).send({ error: false, data: getAllResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Get All Shifts' });
	}
}

async function getOneById(req: Request, res: Response, next: NextFunction) {
	try {
		const getOneByIdResponse = await Shift.findOneById(Number(req.params.shiftId));
		if (getOneByIdResponse === undefined || getOneByIdResponse === null) return next(new NotFoundError('Shift not found'));
		res.status(200).send({ error: false, data: getOneByIdResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Get One Shift' });
	}
}

async function updateOneById(req: Request, res: Response, next: NextFunction) {
	try {
		await ShiftValidator.shiftUpdateOneRequestSchema.validate(req.body, { abortEarly: false });
		const updateOneByIdResponse = await Shift.updateOneById(Number(req.params.shiftId), req.body);
		if (updateOneByIdResponse.affectedRows === 0) return next(new NotFoundError('Shift not found'));
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
		const deleteOneByIdResponse = await Shift.deleteOneById(Number(req.params.shiftId));
		if (deleteOneByIdResponse.affectedRows === 0) return next(new NotFoundError('Shift not found'));
		res.status(200).send({ error: false, data: deleteOneByIdResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Delete One Shift' });
	}
}

async function getShiftsByEmployeeId(req: Request, res: Response, next: NextFunction) {
	try {
		const getAllResponse = await Shift.findAllShiftsByEmployeeId(+req.params.employeeId);
		if (getAllResponse.length === 0) return next(new NotFoundError('Shifts not found'));
		res.status(200).send({ error: false, data: getAllResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Get All Shifts' });
	}
}

async function getShiftsByDepartmentId(req: Request, res: Response, next: NextFunction) {
	try {
		const getAllResponse = await Shift.findAllShiftsByDepartmentId(+req.params.departmentId);
		if (getAllResponse.length === 0) return next(new NotFoundError('Shifts not found'));
		res.status(200).send({ error: false, data: getAllResponse });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Get All Shifts' });
	}
}

export default { createOne, getAll, getOneById, updateOneById, deleteOneById, getShiftsByEmployeeId, getShiftsByDepartmentId };
