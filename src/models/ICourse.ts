import { RowDataPacket } from "mysql2"
import { IUser } from "./IUser"
import { ILesson } from "./ILesson"

export interface ICourse extends RowDataPacket {
	id: number
	name: string
	lessons: ILesson[]
	activeLesson: ILesson
	owner: IUser
}