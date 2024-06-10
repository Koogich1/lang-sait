"use client"

import teacherCreate from '@/actions/user_role_update'
import { Button } from '@/components/ui/button'

const TeacherCreate = () => {
	
	const onClick = () => {
		teacherCreate()
	}

	return (
			<Button onClick={onClick}>Создать</Button>
	)
}

export default TeacherCreate