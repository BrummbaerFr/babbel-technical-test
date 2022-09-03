import App from './app';
import mysql from 'mysql2/promise';
import LanguageController from './controllers/language.controller';
import UserController from './controllers/user.controller';
import LessonController from './controllers/lesson.controller';

async function connectToDatabase() {
	return await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'babbel-test'
	});
}

const connection = connectToDatabase();

const app = new App(
	[
		new LanguageController(connection),
		new UserController(connection),
		new LessonController(connection),
	],
	8000
);

app.listen();