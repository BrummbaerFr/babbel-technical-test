import express from 'express';
import { ILanguage } from '../models/ILanguage';
import { Connection, FieldPacket, ResultSetHeader } from 'mysql2/promise';

class LanguageRepository {
	private connection: Promise<Connection>;

	constructor(connection: Promise<Connection>) {
		this.connection = connection;
	}

	public async getLanguages(): Promise<[ILanguage[], FieldPacket[]]> {
		return (await this.connection).query<ILanguage[]>('SELECT * FROM languages');
	}

	public async addLanguage(name: string, code: string): Promise<[ResultSetHeader, FieldPacket[]]> {
		return (await this.connection).execute<ResultSetHeader>('INSERT INTO languages (name, code) VALUES (?, ?)', [name, code]);
	}

	public async updateLanguage(name: string, newCode: string, code: string): Promise<[ResultSetHeader, FieldPacket[]]> {
		return (await this.connection).execute<ResultSetHeader>('UPDATE languages SET name = ?, code = ? WHERE code = ?', [name, newCode, code]);
	}

	public async deleteLanguages(): Promise<[ResultSetHeader, FieldPacket[]]> {
		return (await this.connection).query<ResultSetHeader>('TRUNCATE TABLE languages');
	}

	public async deleteLanguage(code: string): Promise<[ResultSetHeader, FieldPacket[]]> {
		return (await this.connection).execute<ResultSetHeader>('DELETE FROM languages WHERE code = ?', [ code ]);
	}
}

export default LanguageRepository;