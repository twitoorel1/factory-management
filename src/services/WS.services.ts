import queryDatabase from '@/database/queryDatabase';
import axios from 'axios';

// https://jsonplaceholder.typicode.com/users?email=Karley_Dach@jasper.info&username=Leopoldo_Corkery
const URL_WS = 'https://jsonplaceholder.typicode.com/users';

async function isUserExists(email: string, username: string) {
	try {
		const findUser = await axios.get(`${URL_WS}?email=${email}&username=${username}`);
		if (findUser.data.length > 0) return findUser.data[0];
	} catch (error) {
		console.log(error);
	}
}

// Web Service Get And Save all users in DB
async function fetchUsersFromWebService(): Promise<any[]> {
	try {
		const { data } = await axios.get(URL_WS);
		return data;
	} catch (error) {
		console.error('Failed to fetch users:', error);
		return [];
	}
}

async function synchronizeUsers() {
	const users = await fetchUsersFromWebService();
	for (let user of users) {
		try {
			// Check if user is exists in DB
			const queryFind = `SELECT email, username FROM users WHERE email = ? AND username = ?`;
			const rows = await queryDatabase(queryFind, [user.email, user.username]);
			if (rows.length === 0) {
				// If not, insert the user
				const queryInsert = `INSERT INTO users (id, name, email, username, phone) VALUES (?, ?, ?, ?, ?)`;
				await queryDatabase(queryInsert, [user.id, user.name, user.email, user.username, user.phone]);
			}
		} catch (error) {
			console.error(`Failed to synchronize user ${user.email}:`, error);
		}
	}
}

export default {
	isUserExists,
	synchronizeUsers
};
