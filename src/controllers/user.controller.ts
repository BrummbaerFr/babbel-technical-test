import express from 'express';
import { Connection } from 'mysql2/promise';
import { ILanguage } from '../models/ILanguage';
import { IUser } from '../models/IUser';
import UserRepository from '../repositories/user.repository';

class UserController {
	public path = '/users';
	public router = express.Router();

	private repository: UserRepository;

	constructor(connection: Promise<Connection>) {
		this.repository = new UserRepository(connection);

		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(this.path + '/:id', this.getAccount);
		this.router.patch(this.path + '/:id', this.updateAccount);
		this.router.put(this.path, this.createAccount);
		this.router.delete(this.path + '/:id', this.deleteAccount);
	}

	createAccount = (req: express.Request, res: express.Response) => {
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const username = req.body.username;
		const password = req.body.password;

		const result = this.repository.createAccount(firstName, lastName, username, password);

		result.then(result => {
			if (result[0]['affectedRows'] > 0) {
				const user = {
					id: result[0]['insertId'],
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					username: req.body.username,
					password: req.body.password
				} as IUser;

				res.status(201).send(user);
			}
		});
	}

	getAccount = (req: express.Request, res: express.Response) => {
		const result = this.repository.getAccount(+req.params.id);

		result.then(result => {
			res.send(result[0])
		});
	}

	updateAccount = (req: express.Request, res: express.Response) => {
		const id = +req.params.id;

		let firstName = req.body.firstName;
		let lastName = req.body.lastName;
		let username = req.body.username;
		let password = req.body.password;

		const user = this.repository.getAccount(id);
		user.then(result => {
			let currentUser = result[0][0];

			if (currentUser.first_name !== firstName && !firstName) {
				firstName = currentUser.first_name;
			}

			if (currentUser.last_name !== lastName && !lastName) {
				lastName = currentUser.last_name;
			}

			if (currentUser.username !== username && !username) {
				username = currentUser.username;
			}

			if (currentUser.password !== password && !password) {
				password = currentUser.password;
			}

			const updateResult = this.repository.updateAccount(id, firstName, lastName, username, password);

			updateResult.then(result => {
				if (result[0]['affectedRows'] > 0) {
					res.send();
				}
			});
		})
	}

	deleteAccount = (req: express.Request, res: express.Response) => {
		const id = +req.params.id;

		const result = this.repository.deleteAccount(id);

		result.then(result => {
			res.status(204).send();
		});
	}
}

export default UserController;