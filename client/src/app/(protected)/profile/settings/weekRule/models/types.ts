type timeInDayOfWeek = {
	id: string,
	teacherId: string,
	dayOfWeek: string,
	time: string[],
}

type createFreeTimeInDayOfWeek = {
	teacherId: string,
	dayOfWeek: string,
}