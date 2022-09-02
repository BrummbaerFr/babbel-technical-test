import { RowDataPacket } from "mysql2"
import { IUser } from "./IUser"
import { ILesson } from "./ILesson"

export interface Course extends RowDataPacket {
	name: string
	lessons: ILesson[]
	activeLesson: ILesson
	owner: IUser
}