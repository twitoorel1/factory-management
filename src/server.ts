import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import 'dotenv/config';
import config from 'config';
import { connectToDatabase } from '@/database/db';
import appRoutes from '@/routes';
import WS from '@/services/WS.services';
import errorHandler from '@/errors/errorHandler';
import queryDatabase from '@/database/queryDatabase';
import cron from 'node-cron';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

const app = express();

// Time Zone
momentTimezone.tz.setDefault('Asia/Jerusalem');
moment.tz.setDefault('Asia/Jerusalem');

// Check if public directory exists
if (!fs.existsSync(path.join(__dirname, 'public'))) {
	fs.mkdirSync(path.join(__dirname, 'public'));
}

// Middlewares
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(cors({ origin: true, credentials: true }), appRoutes);
app.use(errorHandler);

// Cron Jobs - Every 6 Hours Check If User Blocked More Than 24 Hours
cron.schedule('0 */6 * * *', async () => {
	const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
	const query = `SELECT * FROM users WHERE blockedAt IS NOT NULL AND blockedAt <= ?`;
	const results = await queryDatabase(query, [twoMinutesAgo]);
	if (results.length > 0) {
		for (const user of results) {
			const userBlockedAt = new Date(user.blockedAt).getTime();
			const currentTime = Date.now();
			if (currentTime - userBlockedAt >= 2 * 60 * 1000) {
				const query = `UPDATE users SET num_of_actions = 5, blockActions = false, blockedAt = NULL WHERE id = ?`;
				await queryDatabase(query, [user.id]);
				console.log(`UnBlocked - User ID: ${user.id}`);
			}
		}
	}
});

// Cron Jobs - Every Day Check If Have New User in Web Service
cron.schedule('0 0 * * *', async () => {
	WS.synchronizeUsers();
});
// // Synchronize with the web service
// WS.synchronizeUsers();

// Set Port
app.set('port', config.get('port') || 4000);

// Connect to Database and Start Server
connectToDatabase()
	.then(() => {
		app.listen(app.get('port'), () => {
			console.log(`Server is running on port ${app.get('port')}`);
		});
	})
	.catch(err => console.log(`Problems connecting to database: ${err.message}`));
