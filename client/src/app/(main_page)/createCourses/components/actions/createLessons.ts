"use server"

import { db } from "@/lib/db"

type Props = {
	rasdelId: string;
	name: string;
	aboutLesson: string;
	photoUrl: string;
}

const createLessons = async({name, aboutLesson, rasdelId, photoUrl}: Props) => {

	console.log(name, aboutLesson, rasdelId, photoUrl)
	const createLesson = await db.lessons.create({
		data: {
			name: name,
			aboutLesson: aboutLesson,
			photoUrl: photoUrl,
			rasdelId: rasdelId, // Связываем урок с разделом
			littleRasdels:{
				create:{ name: "Раздел 1" }
			}
		}
	});
	return createLesson
}

export default createLessons