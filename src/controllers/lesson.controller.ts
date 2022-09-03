import express from "express";
import { Connection } from "mysql2/promise"
import LessonRepository from "../repositories/lesson.repository";

class LessonController {
	public path = '/lessons';
	public router = express.Router();

	private repository: LessonRepository;

	constructor(connection: Promise<Connection>) {
		this.repository = new LessonRepository(connection);

		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(this.path, this.getLessons);
		this.router.put(this.path, this.addLesson);
		this.router.patch(this.path + '/:id', this.updateLesson);
		this.router.delete(this.path + '/:id', this.deleteLesson);
	}

	getLessons = (req: express.Request, res: express.Response) => {
		const lessons = this.repository.getLessons();

		lessons.then(result => {
			res.send(result[0]);
		});
	}

	addLesson = (req: express.Request, res: express.Response) => {
		const result = this.repository.addLesson(req.body.name, +req.body.language, req.body.text);

		result.then(result => {
			if (result[0]['affectedRows'] > 0) {
				res.status(201).send();
			}
		});
	}

	updateLesson = (req: express.Request, res: express.Response) => {
		let id = +req.params.id;

		let name = req.body.name;
		let text = req.body.text;
		let language = req.body.language;

		let lesson = this.repository.getLesson(id);
		lesson.then(result => {
			let currentLesson = result[0][0];

			if (currentLesson.name !== name && !name) {
				name = currentLesson.name;
			}

			if (currentLesson.text !== text && !text) {
				text = currentLesson.text;
			}

			if (currentLesson.language !== language && !language) {
				language = currentLesson.language;
			}
		
			const updateResult = this.repository.updateLesson(id, name, text, language);

			updateResult.then(result => {
				if (result[0]['affectedRows'] > 0) {
					res.send();
				}
			});
		})
	}

	deleteLesson = (req: express.Request, res: express.Response) => {
		let id = +req.params.id;

		const result = this.repository.deleteLesson(id);

		result.then(result => {
			res.status(204).send();
		});
	}
}

export default LessonController;