import * as yup from 'yup';

const loginRequestSchema = yup.object().shape({
	username: yup.string().required('username is required'),
	email: yup.string().required('email is required')
});

export { loginRequestSchema };
