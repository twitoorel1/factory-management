import { RowDataPacket } from 'mysql2/promise';
import queryDatabase from '@/database/queryDatabase';

const DB_NAME = 'employees';

/* CRUD
CREATE - CreateOne
READ - findOneById, findAll
UPDATE - updateOneById
DELETE - deleteOneById
*/

// Create One
async function createOne(first_name: string, last_name: string, start_work_year: number, department_id: number) {
	const query = `INSERT INTO ${DB_NAME} (first_name, last_name, start_work_year, department_id) VALUES (?, ?, ?, ?);`;

	try {
		const results = await queryDatabase(query, [first_name, last_name, start_work_year, department_id]);
		return results;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Read All
async function findAll() {
	const query = `
	SELECT
	employees.id AS employee_id,
	concat(employees.first_name, " ", employees.last_name) AS employee_fullName,
	departments.name AS department_name,
	GROUP_CONCAT(shifts.date ORDER BY shifts.date ASC SEPARATOR ', ') AS employee_shifts
	FROM ${DB_NAME}
	INNER JOIN departments ON employees.department_id = departments.id
	INNER JOIN shifts ON employees.id = shifts.employees_id
	GROUP BY employees.id, employees.first_name, employees.last_name, departments.name;
	`;

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
	// const query = `SELECT * FROM ${DB_NAME} WHERE id = ?;`;
	const query = `
		SELECT
		concat(employees.first_name, " ", employees.last_name) AS FullName,
		departments.name AS department_name
		FROM ${DB_NAME}
		INNER JOIN departments ON employees.department_id = departments.id
		WHERE employees.id = ?;
	`;

	try {
		const result = await queryDatabase(query, [id]);
		const employee = result as RowDataPacket[];
		// if (!employee) throw new UnauthorizeError('Employee not found');
		if (employee.length > 0) return employee[0];
		return null;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Update One By Id
async function updateOneById(id: number, body: { first_name: string; last_name: string; start_work_year: number; department_id: number }) {
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
async function deleteOneById(employees_id: number) {
	const query = `DELETE FROM ${DB_NAME} WHERE id = ?;`;
	const query2 = `DELETE FROM shifts WHERE employees_id = ?;`;

	try {
		await queryDatabase(query, [employees_id]);
		const result = await queryDatabase(query2, [employees_id]);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// Read all employees who do not belong to the department
async function findAllEmployeesNotWorkingInDepartment(department_id: number) {
	const query = `SELECT * FROM employees WHERE department_id != ?`;

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
	findAllEmployeesNotWorkingInDepartment
};
