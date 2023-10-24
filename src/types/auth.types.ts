import { Secret } from 'jsonwebtoken';

export interface IUser {
	id: number;
	name: string;
	email: string;
	username: string;
	phone: string;
	max_actions: number;
	num_of_actions: number;
	last_connected?: string | Date | number | any;
	blockActions: number;

	// Statistic
	jwt_ac_token?: Secret;
	jwt_rf_token?: Secret;
	created_at?: Date | number | string | any;
	updated_at?: Date | number | string | any;
}
