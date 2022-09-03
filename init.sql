CREATE DATABASE IF NOT EXISTS `babbel-test`;
USE `babbel-test`;


CREATE TABLE IF NOT EXISTS `users` (
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `languages` (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	code VARCHAR(2) UNIQUE NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS `lessons` (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	language INT NOT NULL,
	text TEXT NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT FK_lesson_language FOREIGN KEY (language) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS `courses` (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	current_lesson INT NOT NULL,
	owner INT NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT FK_course_active_lesson FOREIGN KEY (current_lesson) REFERENCES lessons(id) ON UPDATE CASCADE,
	CONSTRAINT FK_course_owner FOREIGN KEY (owner) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS `courses_lessons` (
	course_id INT NOT NULL,
	lesson_id INT NOT NULL,
	PRIMARY KEY (course_id, lesson_id),
	CONSTRAINT FK_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_course_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- sample data
INSERT INTO users (first_name, last_name, username, password) VALUES ('Richard', 'BLONDEL', 'richie', 'r00t');
INSERT INTO `languages` (name, code) VALUES ('French', 'fr'), ('Portuguese', 'pt'), ('Russian', 'ru');
INSERT INTO `lessons` (name, language, text) VALUES ('Pronouns', 1, 'Les pronoms en français sont : je, tu, il/elle, nous, vous, ils/elles.');
INSERT INTO `courses` (name, current_lesson, owner) VALUES ('Français débutant', 1, 1);
INSERT INTO `courses_lessons` (course_id, lesson_id) VALUES (1, 1);