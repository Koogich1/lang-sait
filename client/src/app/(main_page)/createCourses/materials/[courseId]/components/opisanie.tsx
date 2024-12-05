"use client"

import { courseData, User } from "@prisma/client"

type Props = {
	course: courseData
	user: User
}

const Opisanie = ({course, user}: Props) => {
	return (
		<div className="px-3">
			{course.userId === user.id && 
			<div className="text-lg mt-2 text-blue-400 font-medium">Создайте лучшее описание для вашего лучшего, уникального курса!</div>
			}
			<div className="mt-2">{course.aboutCourse}</div>
		</div>
	)
}

export default Opisanie