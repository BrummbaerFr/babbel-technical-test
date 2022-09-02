import express from 'express';
import { Connection } from 'mysql2/promise';
import { ILanguage } from '../models/ILanguage';
import LanguageRepository from '../repositories/language.repository';

class LanguageController {
	public path = '/languages';
	public router = express.Router();

	private repository: LanguageRepository;

	constructor(connection: Promise<Connection>) {
		this.repository = new LanguageRepository(connection);

		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(this.path, this.getLanguages);
		this.router.put(this.path, this.addLanguage);
		this.router.patch(this.path + '/:code', this.updateLanguage);
		this.router.delete(this.path, this.deleteLanguages);
		this.router.delete(this.path + '/:code', this.deleteLanguage);
	}

	getLanguages = (req: express.Request, res: express.Response) => {
		const languages = this.repository.getLanguages();
		languages.then(languages => {
			res.send(languages[0])
		});
	};

	addLanguage = (req: express.Request, res: express.Response) => {
		const result = this.repository.addLanguage(req.body.name, req.body.code);

		result.then(result => {
			if (result[0]['affectedRows'] > 0) {
				res.status(201).send();
			}
		});
	}

	updateLanguage = (req: express.Request, res: express.Response) => {
		let newCode = req.body.code;
		let name = req.body.name;
		let code = req.params.code;

		const result = this.repository.updateLanguage(name, newCode, code);

		result.then(result => {
			if (result[0]['affectedRows'] > 0) {
				res.status(201).send();
			}
		});
	}

	deleteLanguages = (req: express.Request, res: express.Response) => {
		const result = this.repository.deleteLanguages();

		result.then(result => {
			res.status(204).send();
		});
	}

	deleteLanguage = (req: express.Request, res: express.Response) => {
		const result = this.repository.deleteLanguage(req.params.code);

		result.then(result => {
			res.status(204).send();
		});
	}
}

export default LanguageController;