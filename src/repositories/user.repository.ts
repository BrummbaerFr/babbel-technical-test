import express from 'express';
import { IUser } from '../models/IUser';
import { Connection, ResultSetHeader, FieldPacket } from 'mysql2/promise';

class UserRepository {
	private connection: Promise<Connection>;

	constructor(connection: Promise<Connection>) {
		this.connection = connection;
	}

	public async createAccount(firstName: string, lastName: string, username: string, password: string): Promise<[ResultSetHeader, FieldPacket[]]> {
		return (await this.connection).execute<ResultSetHeader>('INSERT INTO users (first_name, last_name, username, password) VALUES (?, ?, ?, ?)',
			[firstName, lastName, username, password]);
	}

	public async getAccount(id: number): Promise<[IUser[], FieldPacket[]]> {
		return (await this.connection).execute<IUser[]>('SELECT * FROM users WHERE id = ?', [id]);
	}

	public async updateAccount(id: number, firstName: string, lastName: string, username: string, password: string): Promise<[ResultSetHeader, FieldPacket[]]> {
		return (await this.connection).execute<ResultSetHeader>('UPDATE users SET first_name = ?, last_name = ?, username = ?, password = ? WHERE id = ?',
			[firstName, lastName, username, password, id]);
	}

	public async deleteAccount(id: number): Promise<[ResultSetHeader, FieldPacket[]]> {
		return (await this.connection).execute<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
	}
}

export default UserRepository;