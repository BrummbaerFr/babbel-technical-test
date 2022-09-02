import { RowDataPacket } from "mysql2"

export interface IUser extends RowDataPacket {
	id: number
	firstName: string
	lastName: string
	username: string
	password: string
}