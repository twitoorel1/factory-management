import { Request, Response, NextFunction } from 'express';
import User from '@/models/user.models';
import queryDatabase from '@/database/queryDatabase';
import jsonfile from 'jsonfile';
import { NotFoundError } from '@/errors/Errors';
import { IUser } from '@/types/auth.types';

interface IAction {
	id: number;
	maxActions: number;
	date: Date | string;
	actionAllowed: number;
}

async function updateJson(userId: number, maxActions: number, actionAllowed: number) {
	const filePath = 'src/data/actions.json';
	try {
		const jsonData = await jsonfile.readFile(filePath);
		const newAction: IAction = {
			id: userId,
			maxActions,
			date: new Date().toLocaleString(),
			actionAllowed
		};
		jsonData.actions.push(newAction);
		await jsonfile.writeFile(filePath, jsonData, { spaces: 2 });
	} catch (error) {
		console.log(error);
	}
}

async function limitedActions(req: Request, res: Response, next: NextFunction) {
	try {
		const findUser = (await User.findOneById(Number(req.user.userId))) as IUser;
		if (!findUser) return next(new NotFoundError('User not found'));
		if (findUser.num_of_actions <= 0) {
			const currentDateTime = new Date();
			const queryUpdateUser1 = `UPDATE users SET blockActions = true, blockedAt = ?, jwt_ac_token = NULL, jwt_rf_token = NULL WHERE id = ?;`;
			await queryDatabase(queryUpdateUser1, [currentDateTime, req.user.userId]);
			return res.status(401).json({ error: 'Limited Actions' });
		}
		const query = `UPDATE users SET num_of_actions = num_of_actions - 1 WHERE id = ?`;
		const query2 = `SELECT num_of_actions FROM users WHERE id = ?`;
		await Promise.all([await queryDatabase(query, [req.user.userId]), await queryDatabase(query2, [req.user.userId])]);
		await updateJson(+req.user.userId, findUser.max_actions, findUser.num_of_actions - 1);
		return next();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An error occurred while Limited Actions' });
	}
}

export default limitedActions;
