import { CoursesList } from '@/features/courses-list/pub/courses-list'
import { CreateCourseForm } from '@/features/courses-list/pub/create-course-form'

const Courses = () => {

	return (
		<div className='flex min-h-screen flex-col p-8'>
			<CreateCourseForm revalidatePagePath='/' className='max-w-[300px]' />
			<CoursesList revalidatePagePath='/' />
		</div>
	)
}

export default Courses