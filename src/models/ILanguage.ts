import { RowDataPacket } from "mysql2"

export interface ILanguage extends RowDataPacket {
	id: number
	name: string
	code: string
}