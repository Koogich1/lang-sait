"use server"

import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const SetFreeHours = async (selectedDay: string, items: string[]) => {
	const user = await currentUser();

	if (!user?.email) {
			return { error: "Подключите почту" };
	}

	const userEmail = await getUserByEmail(user?.email);

	const teacherId = userEmail?.teacherId;

	if (!teacherId) {
			console.log("нет учителя");
			return;
	}

	const dayProperty = selectedDay;

	await db.teacherAvailability.update({
			where: { id: teacherId },
			data: {
					[dayProperty]: items
			}
	});

	console.log(`Свободные часы для ${selectedDay} обновлены успешно.`);
};

export default SetFreeHours;