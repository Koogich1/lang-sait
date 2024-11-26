import { db } from "@/lib/db"
import {cache} from "react"


class CoursesRepository {
	getCoursesList = cache(
		(): Promise<CourseListElement[]>=> db.course.findMany()
	);

	createCourseElement = (command: CreateCourseListElementCommand
	): Promise<CourseListElement> => {
		return db.course.create({
			data: command,
		})
	};
	deleteCourseElement = (command: DeleteCourseListElementCommand) => {
		return db.course.delete({
			where:{
				id: command.id
			}
		})
	};
}

export const coursesRepository = new CoursesRepository();