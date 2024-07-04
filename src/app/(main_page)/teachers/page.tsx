"use client"

import { useEffect, useState } from 'react'
import MainHeader from '../header'
import getAllTeachers from "./getTeachers"
import { db } from '@/lib/db'

type languagePick = 'English' | 'China' | 'Polish' | 'German'

type Teacher = {
	id: string;
	teacherId: string;
	userInfo: {
			image: string | null;
			name: string | null;
			surname: string | null;
	};
	teacherInfo: {
			language: languagePick;
	};
};

const TeachersPage = () => {
	const [teachers, setTeachers] = useState<Teacher[]>([]);

	useEffect(() => {
			const fetchData = async () => {
					const teachersData = await getAllTeachers();
					if (teachersData && teachersData.length > 0) {
						setTeachers(teachersData.filter((teacher): teacher is Teacher => teacher !== undefined));
					}
			}

			fetchData();
	}, []);

	return (
			<>
					<MainHeader />
					<div>
							{teachers.map((teacher, id) => (
									<div key={id}>
											<div>Photo</div>
											<p>{teacher.userInfo.name}</p>
											<p>{teacher.userInfo.surname}</p>
											<p>{teacher.teacherInfo.language}</p>
									</div>
							))}
					</div>
			</>
	);
}

export default TeachersPage