import express from "express";
import { Connection, FieldPacket } from "mysql2/promise"
import { ICourse } from "../models/ICourse";
import CourseRepository from "../repositories/course.repository";

class CourseController {
	public path = '/courses';
	public router = express.Router();

	private repository: CourseRepository;

	constructor(connection: Promise<Connection>) {
		this.repository = new CourseRepository(connection);

		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(this.path, this.getCourses);
		this.router.put(this.path, this.addCourse);
		this.router.delete(this.path + '/:id', this.deleteCourse);
	}

	getCourses = (req: express.Request, res: express.Response) => {
		const userId = req.query.user;
		let courses: Promise<[ICourse[], FieldPacket[]]>;

		if (userId) {
			let ownerId = +userId;
			courses = this.repository.getCourses(+ownerId);
		} else {
			courses = this.repository.getCourses(0);
		}

		courses.then(result => {
			res.send(result[0]);
		});
	}

	addCourse = (req: express.Request, res: express.Response) => {
		const name = req.body.name;
		const lessons = req.body.lessons
		const activeLesson = req.body.activeLesson;
		const owner = req.body.owner;

		const result = this.repository.addCourse(name, lessons, activeLesson, owner);

		result.then(result => {
			if (result[0]['affectedRows'] > 0) {
				res.status(201).send();
			}
		});
	}

	deleteCourse = (req: express.Request, res: express.Response) => {
		const id = +req.params.id;

		const result = this.repository.deleteCourse(id);

		result.then(result => {
			res.status(204).send();
		});
	}
}

export default CourseController;