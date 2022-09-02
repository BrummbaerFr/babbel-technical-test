import { RowDataPacket } from "mysql2"

export interface ILesson extends RowDataPacket {
	name: string
	language: string
	content: string
}