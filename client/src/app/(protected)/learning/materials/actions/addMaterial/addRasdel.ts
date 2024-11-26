"use server"

import { db } from "@/lib/db"

const addRasdel = async(rasdelId: string, customRasdelId: string) => {
	const rasdel = await db.customRasdelBox.findUnique({
		where: { id: customRasdelId }
	});
	
	if (!rasdel) {
		console.log('Custom rasdel ID не существует  ' + `${customRasdelId}`);
		throw new Error('Custom rasdel ID не существует  ' + `${customRasdelId}`);
	}

	const allRAsdels = await db.customCourseSet.findMany({
		where:{
			customRasdelId: customRasdelId
		}
	})

	const data = await db.customCourseSet.create({
		data: {
			customRasdelId: customRasdelId,
			rasdels: {
				connect: { id: rasdelId } // Убедитесь, что это массив
			},
			position: allRAsdels ? allRAsdels.length : 0
		}
	});
}

export default addRasdel