"use server"

import { db } from "@/lib/db"

const findFirstTwoItems = async (rasdelId: string) => {
  try{
		const courseSets = await db.customCourseSet.findMany({
			where: {
				customRasdelId: rasdelId,
			},
			include: {
				courses: true,
				lessons: true,
				rasdels: true,
			}
		});
	
		// Собираем все элементы
		const items:any = [];
		
		courseSets.forEach(courseSet => {
			if (courseSet.courses.length > 0) {
				items.push(...courseSet.courses.map(course => ({ ...course, type: 'course' })));
			}
			if (courseSet.lessons.length > 0) {
				items.push(...courseSet.lessons.map(lesson => ({ ...lesson, type: 'lesson' })));
			}
			if (courseSet.rasdels.length > 0) {
				items.push(...courseSet.rasdels.map(rasdel => ({ ...rasdel, type: 'rasdel' })));
			}
		});
	
		// Сортируем по data.position и выбираем первые два уникальных элемента
		const firstTwoItems = items
			.sort((a: any, b:any) => (a.data?.position || Infinity) - (b.data?.position || Infinity))
			.slice(0, 2);
	
			return firstTwoItems.length > 0 ? firstTwoItems : null;  // Возвращаем первые два элемента
	} catch(e){
		console.log(e)
	}
}

export default findFirstTwoItems;
