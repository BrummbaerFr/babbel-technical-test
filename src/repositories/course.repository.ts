import { Connection, FieldPacket, ResultSetHeader } from 'mysql2/promise';
import { ICourse } from '../models/ICourse';

class CourseRepository {
	private connection: Promise<Connection>;

	constructor(connection: Promise<Connection>) {
		this.connection = connection;
	}

	public async getCourse(id: number): Promise<[ICourse[], FieldPacket[]]> {
		return (await this.connection).execute<ICourse[]>('SELECT * FROM courses WHERE id = ?', [id]);
	}

	public async getCourses(userId: number): Promise<[ICourse[], FieldPacket[]]> {
		let params = [];
		let sql = 'SELECT * FROM courses';

		if (userId) {
			sql += ' WHERE owner = ?'
			params.push(userId);
		}

		return (await this.connection).execute<ICourse[]>(sql, params);
	}

	public async addCourse(name: string, lessons: number[], activeLesson: number, owner: number): Promise<[ResultSetHeader, FieldPacket[]]> {
		let result = (await this.connection).execute<ResultSetHeader>('INSERT INTO courses (name, current_lesson, owner) VALUES (?, ?, ?)', [name, activeLesson, owner]);

		result.then(async result => {
			let courseId = result[0]['insertId'];

			let sql = 'INSERT INTO courses_lessons (course_id, lesson_id) VALUES ';
			let params: number[] = [];
			lessons.forEach(lessonId => {
				sql += '(?, ?),'
				params.push(courseId, lessonId);
			});
			// Remove last comma from SQL query
			sql = sql.slice(0, -1);

			(await this.connection).execute<ResultSetHeader>(sql, params);
		});

		return result;
	}

	public async deleteCourse(id: number): Promise<[ResultSetHeader, FieldPacket[]]> {
		return (await this.connection).execute<ResultSetHeader>('DELETE FROM courses WHERE id = ?', [id]);
	}
}

export default CourseRepository;