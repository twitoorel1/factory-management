import express from 'express';
import formatUptime from '@/utils/dates.util';
import { authMiddleware } from '@/middlewares/auth.middleware';
// import LimitedActions from '@/middlewares/actions.middleware';
const router = express.Router();

import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import employeeRoutes from './employee.routes';
import departmentRoutes from './departments.routes';
import shiftRoutes from './shifts.routes';

router.get('/', (req, res) => {
	res.json({
		status: 'OK',
		uptime: formatUptime(process.uptime())
	});
});

router.use('/auth', authRoutes);
router.use('/user', authMiddleware, userRoutes);

// LimitedActions - Middleware to limit the number of requests per minute
router.use('/employee', authMiddleware, employeeRoutes);
router.use('/department', authMiddleware, departmentRoutes);
router.use('/shift', authMiddleware, shiftRoutes);

export default router;
