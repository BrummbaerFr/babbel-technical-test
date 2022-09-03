import { RowDataPacket } from "mysql2"

export interface ILesson extends RowDataPacket {
	id: number
	name: string
	language: string
	content: string
}