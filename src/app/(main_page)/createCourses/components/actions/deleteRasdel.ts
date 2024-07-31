"use server"

import { db } from "@/lib/db"

const deleteLittleRasdel = async(rasdelId: string) => {
	await db.option.deleteMany({
		where: {
			test: {
				littleRasdelId: rasdelId
			}
		}
	});

	await db.answer.deleteMany({
		where:{
			test:{
				littleRasdelId: rasdelId
			}
		}
	})
	
	await db.test.deleteMany({
		where: {
			littleRasdelId: rasdelId
		}
	})
	const data = await db.littleRasdel.delete({
		where:{
			id: rasdelId
		}
	})
	return data
}

export default deleteLittleRasdel