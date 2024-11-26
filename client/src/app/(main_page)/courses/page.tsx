import { HiArrowDown } from "react-icons/hi"
import MainHeader from "../header"
import CoursesBlock from "../blocks/coursesEl/coursesBlock"

const Courses = () => {
	return (
	<>
		<MainHeader />
		<div className="flex justify-around items-center w-full max-w-[1440px] px-[5%] mx-auto text-[#3E236C] flex-col m-0 pb-20">
			<div className='flex flex-col w-full bg-white p-5 mt-5 rounded-lg shadow-lg'>
        <div className="flex text-gray-600 mt-3">
          <h1 className="text-3xl font-medium">Онлайн курсы</h1>
          <HiArrowDown className="text-3xl ml-2 mt-1"/>
        </div>
        <div>
          <CoursesBlock />
        </div>
      </div>
    </div>
	</>
	)
}

export default Courses