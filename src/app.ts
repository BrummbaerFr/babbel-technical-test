import express from 'express';

class App {
	public app: express.Application;
	public port: number;

	constructor(controllers: any[], port: number) {
		this.app = express();
		this.port = port;

		this.app.use(express.json());
		this.initializeControllers(controllers);
	}

	/**
	 * Connects all controller routes to the Express router.
	 * @param controllers controllers to connect to the router.
	 */
	private initializeControllers(controllers: any[]) {
		controllers.forEach((controller) => {
			this.app.use('/', controller.router);
		});
	}

	/**
	 * Starts the server.
	 */
	public listen() {
		this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`))
	}
}

export default App;