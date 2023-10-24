import * as yup from 'yup';

// Model Employees:
const EmployeeCreateOneRequestSchema = yup.object().shape({
	first_name: yup.string().required('first name is required'),
	last_name: yup.string().required('last name is required'),
	start_work_year: yup.number().required('start work year is required'),
	department_id: yup.number().required('department id is required')
});
const EmployeeUpdateOneRequestSchema = yup.object().shape({
	first_name: yup.string(),
	last_name: yup.string(),
	start_work_year: yup.number(),
	department_id: yup.number()
});

// Model Departments:
const departmentCreateOneRequestSchema = yup.object().shape({
	name: yup.string().required('name is required'),
	manager: yup.number().required('manager is required')
});
const departmentUpdateOneRequestSchema = yup.object().shape({
	name: yup.string(),
	manager: yup.number()
});

// Model Shifts:
const shiftCreateOneRequestSchema = yup.object().shape({
	date: yup.string().required('date is required'),
	starting_hour: yup.number().required('starting hour is required'),
	ending_hour: yup.number().required('ending hour is required'),
	employees_id: yup.number().required('employees id is required')
});
const shiftUpdateOneRequestSchema = yup.object().shape({
	name: yup.string(),
	manager: yup.number()
});

export default {
	EmployeeCreateOneRequestSchema,
	EmployeeUpdateOneRequestSchema,
	departmentCreateOneRequestSchema,
	departmentUpdateOneRequestSchema,
	shiftCreateOneRequestSchema,
	shiftUpdateOneRequestSchema
};
