"use client"

import { Button } from "@/components/ui/button"
import { useTransition } from "react"

export function CourseItem
({
	course, onDelete
}:{
	course : CourseListElement, onDelete: () => Promise<void>
}) {

	const [isLoadingDelete, startDeleteTransition] = useTransition()

	const handleDelete = () => {
		startDeleteTransition(async () => {
			await onDelete()
		})
	}

	return(
		<div className="bg-white w-full rounded-lg shadow-lg p-5 space-y-5 text-gray-600">
			<div className="text-2xl font-bold uppercase">
				{course.name}
			</div>
			<div>
				{course.description}
			</div>
			<div>
				<Button disabled={isLoadingDelete} onClick={handleDelete}>Удалить</Button>
			</div>
		</div>
	)
}