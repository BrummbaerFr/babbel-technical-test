import App from './app';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv'
import LanguageController from './controllers/language.controller';
import UserController from './controllers/user.controller';
import LessonController from './controllers/lesson.controller';
import CourseController from './controllers/course.controller';

dotenv.config();

async function connectToDatabase() {
	let conn = await mysql.createConnection({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
	});

	initialiseDatabase(conn);

	return conn;
}

async function initialiseDatabase(conn: mysql.Connection) {
	conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE_NAME}\``);
	conn.query(`USE \`${process.env.DATABASE_NAME}\``);
	conn.query(`CREATE TABLE IF NOT EXISTS \`users\` (
		id INT NOT NULL AUTO_INCREMENT,
		first_name VARCHAR(255) NOT NULL,
		last_name VARCHAR(255) NOT NULL,
		username VARCHAR(255) NOT NULL,
		password VARCHAR(255) NOT NULL,
		PRIMARY KEY (id)
	)`);
	conn.query(`CREATE TABLE IF NOT EXISTS \`languages\` (
		id INT NOT NULL AUTO_INCREMENT,
		name VARCHAR(50) NOT NULL,
		code VARCHAR(2) UNIQUE NOT NULL,
		PRIMARY KEY (id)
	)`);
	conn.query(`CREATE TABLE IF NOT EXISTS \`lessons\` (
		id INT NOT NULL AUTO_INCREMENT,
		name VARCHAR(255) NOT NULL,
		language INT NOT NULL,
		text TEXT NOT NULL,
		PRIMARY KEY (id),
		CONSTRAINT FK_lesson_language FOREIGN KEY (language) REFERENCES languages(id)
	)`);
	conn.query(`CREATE TABLE IF NOT EXISTS \`courses\` (
		id INT NOT NULL AUTO_INCREMENT,
		name VARCHAR(255) NOT NULL,
		current_lesson INT NOT NULL,
		owner INT NOT NULL,
		PRIMARY KEY (id),
		CONSTRAINT FK_course_active_lesson FOREIGN KEY (current_lesson) REFERENCES lessons(id) ON UPDATE CASCADE,
		CONSTRAINT FK_course_owner FOREIGN KEY (owner) REFERENCES users(id)
	);`);
	conn.query(`CREATE TABLE IF NOT EXISTS \`courses_lessons\` (
		course_id INT NOT NULL,
		lesson_id INT NOT NULL,
		PRIMARY KEY (course_id, lesson_id),
		CONSTRAINT FK_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
		CONSTRAINT FK_course_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE ON UPDATE CASCADE
	)`);
}

const connection = connectToDatabase();

const app = new App(
	[
		new LanguageController(connection),
		new UserController(connection),
		new LessonController(connection),
		new CourseController(connection),
	],
	8000
);

app.listen();