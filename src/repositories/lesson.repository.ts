import { Connection, FieldPacket, ResultSetHeader } from 'mysql2/promise';
import { ILesson } from '../models/ILesson';

class LessonRepository {
	private connection: Promise<Connection>;

	constructor(connection: Promise<Connection>) {
		this.connection = connection;
	}

	public async getLesson(id: number): Promise<[ILesson[], FieldPacket[]]> {
		return (await this.connection).execute<ILesson[]>('SELECT * FROM lessons WHERE id = ?', [id]);
	}

	public async getLessons(): Promise<[ILesson[], FieldPacket[]]> {
		return (await this.connection).query<ILesson[]>('SELECT * FROM lessons');
	}

	public async addLesson(name: string, language: number, text: string): Promise<[ResultSetHeader, FieldPacket[]]> {
		return (await this.connection).execute<ResultSetHeader>('INSERT INTO lessons (name, language, text) VALUES (?, ?, ?)', [name, language, text]);
	}

	public async updateLesson(id: number, name: string, text: string, language: number): Promise<[ResultSetHeader, FieldPacket[]]> {
		return (await this.connection).execute<ResultSetHeader>('UPDATE lessons SET name = ?, language = ?, text = ? WHERE id = ?', [name, language, text, id]);
	}

	public async deleteLesson(id: number): Promise<[ResultSetHeader, FieldPacket[]]> {
		return (await this.connection).execute<ResultSetHeader>('DELETE FROM lessons WHERE id = ?', [ id ]);
	}
}

export default LessonRepository;