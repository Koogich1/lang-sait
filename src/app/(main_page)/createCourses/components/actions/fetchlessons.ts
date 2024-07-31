"use server"

import { db } from "@/lib/db";

type Props = {
	rasdId: string;
}

const fetchlessons = async({rasdId}: Props) => {
	const data = await db.lessons.findMany({
		where:{
			rasdelId: rasdId
		}
	})
	return data
}

export default fetchlessons