import { RowDataPacket } from 'mysql2/promise';
import queryDatabase from '@/database/queryDatabase';

const DB_NAME = 'shifts';

/* CRUD
CREATE - CreateOne
READ - findOneById, findAll, findAllShiftsByEmployeeId, findAllShiftsByDepartmentId
UPDATE - updateOneById
DELETE - deleteOneById
*/

// Create One
async function createOne(date: string, starting_hour: number, ending_hour: number, employees_id: number) {
	const query = `INSERT INTO ${DB_NAME} (date, starting_hour, ending_hour, employees_id) VALUES (?, ?, ?, ?);`;

	try {
		const results = await queryDatabase(query, [date, starting_hour, ending_hour, employees_id]);
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
async function updateOneById(id: number, body: { date: string; starting_hour: number; ending_hour: number; employees_id: number }) {
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
async function deleteOneById(id: number) {
	const query = `DELETE FROM ${DB_NAME} WHERE id = ?;`;

	try {
		const results = await queryDatabase(query, [id]);
		return results;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Read All Shifts By Employee Id
async function findAllShiftsByEmployeeId(employee_id: number) {
	const query = `SELECT * FROM ${DB_NAME} WHERE employees_id = ?;`;

	try {
		const results = await queryDatabase(query, [employee_id]);
		if (results.length === 1) return results[0] as RowDataPacket[];
		return results;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Read All Shifts By department Id
async function findAllShiftsByDepartmentId(department_id: number) {
	const query = `
	SELECT
	departments.id AS department_id,
	departments.name AS department_name,
	CONCAT(managers.first_name, ' ', managers.last_name) AS department_manager,
	GROUP_CONCAT(DISTINCT CONCAT(employees.first_name, ' ', employees.last_name) SEPARATOR ', ') AS department_employees
	FROM shifts
	INNER JOIN employees ON shifts.employees_id = employees.id
	INNER JOIN departments ON employees.department_id = departments.id
	LEFT JOIN employees AS managers ON departments.manager = managers.id
	WHERE departments.id = ?
	GROUP BY departments.id, departments.name, managers.first_name, managers.last_name;
	`;

	try {
		const results = await queryDatabase(query, [department_id]);
		if (results.length === 1) return results[0] as RowDataPacket[];
		return results;
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
	deleteOneById,
	findAllShiftsByEmployeeId,
	findAllShiftsByDepartmentId
};
