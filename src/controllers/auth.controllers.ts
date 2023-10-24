import { NextFunction, Request, Response } from 'express';
import User from '@/models/user.models';
import errorHandler from '@/errors/errorHandler';
import errorHandlerYup from '@/errors/errorHandlerYup';
import { NotFoundError, UnauthorizeError } from '@/errors/Errors';
import { loginRequestSchema } from '@/validators/authRequests.schema';
import WS from '@/services/WS.services';

async function login(req: Request, res: Response, next: NextFunction) {
	try {
		await loginRequestSchema.validate(req.body, { abortEarly: false });
		const { email, username } = req.body;
		const userExist = await WS.isUserExists(email, username);
		if (!userExist) throw new NotFoundError('User not found');
		const token = await User.login(userExist);
		res.status(200).json({ error: false, message: 'Login Successful', isAuthenticated: true, user: userExist, ac_token: token.accessToken, rf_token: token.refreshToken });
	} catch (error: any) {
		if (error.name === 'ValidationError') {
			return errorHandlerYup(error, req, res, next);
		}
		if (error.name) {
			return errorHandler(error, req, res, next);
		}
		console.log(error);
	}
}

async function isLogin(req: Request, res: Response, next: NextFunction) {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader?.split(' ')[1];
		if (!token) return next(new UnauthorizeError('No token provided'));
		const user = await User.isLogin(token);
		delete user?.password;
		res.status(200).send({ error: false, message: 'Is Login User Successful', isAuthenticated: true, user, token: user?.jwt_ac_token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From IsLogin' });
	}
}

async function logout(req: Request, res: Response, next: NextFunction) {
	try {
		const { userId } = req.user;
		const authHeader = req.headers['authorization'];
		const token = authHeader?.split(' ')[1];
		if (!token && !userId) return next(new UnauthorizeError('Token And UserID not provided'));

		const findUser = await User.findOneById(parseInt(userId));
		if (!findUser) return next(new NotFoundError('User not found'));
		await User.logout(parseInt(findUser.id));
		res.status(200).send({ error: false, message: 'Logout Successful', isAuthenticated: false });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, statusCode: 500, message: 'Error From logout' });
	}
}

export default { login, isLogin, logout };
