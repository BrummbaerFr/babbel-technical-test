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

INSERT INTO `languages` (name, code) VALUES ('French', 'fr'), ('Portuguese', 'pt'), ('Russian', 'ru');