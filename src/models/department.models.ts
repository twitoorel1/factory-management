import { RowDataPacket } from 'mysql2/promise';
import queryDatabase from '@/database/queryDatabase';

const DB_NAME = 'departments';

/* CRUD
CREATE - CreateOne
READ - findOneById, findAll
UPDATE - updateOneById
DELETE - deleteOneById
*/

// Create One
async function createOne(name: string, manager: number) {
	const query = `INSERT INTO ${DB_NAME} (name, manager) VALUES (?, ?);`;

	try {
		const results = await queryDatabase(query, [name, manager]);
		return results;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Read All
async function findAll() {
	const query = `SELECT * FROM ${DB_NAME};`;

	try {
		const results = await queryDatabase(query);
		if (results.length === 1) return results[0] as RowDataPacket[];
		return results;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Read One By Id
async function findOneById(id: number) {
	const query = `SELECT * FROM ${DB_NAME} WHERE id = ?;`;

	try {
		const result = await queryDatabase(query, [id]);
		const data = result as RowDataPacket[];
		// if (!data) throw new UnauthorizeError('Department not found');
		if (data.length > 0) return data[0];
		return null;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Update One By Id
async function updateOneById(id: number, body: { name: string; manager: number }) {
	const fieldToUpdate = Object.keys(body)
		.map(key => `${key} = ?`)
		.join(', ');
	const valuesToUpdate = [...Object.values(body), id];
	const query = `UPDATE ${DB_NAME} SET ${fieldToUpdate} WHERE id = ?;`;

	try {
		const results = await queryDatabase(query, valuesToUpdate);
		return results;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Delete One By Id
async function deleteOneById(departments_id: number) {
	const query = `DELETE FROM ${DB_NAME} WHERE id = ?;`;
	const query2 = `DELETE FROM employees WHERE department_id = ?;`;

	try {
		await queryDatabase(query, [departments_id]);
		const result = await queryDatabase(query2, [departments_id]);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export default {
	createOne,
	findAll,
	findOneById,
	updateOneById,
	deleteOneById
};
