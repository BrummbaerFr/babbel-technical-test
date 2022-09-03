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

	/**
	 * Adds a course in the database.
	 * @param name the course's name.
	 * @param lessons an array of lesson identifiers that belong to the course.
	 * @param activeLesson the current active lesson's identifier.
	 * @param owner the course's owner.
	 * @returns a Promise object about the inserted data.
	 */
	public async addCourse(name: string, lessons: number[], activeLesson: number, owner: number): Promise<[ResultSetHeader, FieldPacket[]]> {
		let result = (await this.connection).execute<ResultSetHeader>('INSERT INTO courses (name, current_lesson, owner) VALUES (?, ?, ?)', [name, activeLesson, owner]);

		/**
		 * Now that the course is created, bind the course to its lessons, using a junction table:
		 */
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