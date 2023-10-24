import { NextFunction, Request, Response } from 'express';
import User from '@/models/user.models';
import { NotFoundError } from '@/errors/Errors';

async function allUsers(req: Request, res: Response, next: NextFunction) {
	try {
		const users = await User.getAllUsers();
		if (users.length === 0) return next(new NotFoundError('Employees not found'));
		res.status(200).send({ error: false, data: users });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From Get All Users' });
	}
}

export default { allUsers };
