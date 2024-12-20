import { HiArrowDown } from "react-icons/hi"
import MainHeader from "../header"
import CoursesBlock from "../blocks/coursesEl/coursesBlock"

const Courses = () => {
	return (
	<>
		<MainHeader />
		<div className="flex justify-around items-center w-full max-w-[1440px] px-[5%] mx-auto text-[#3E236C] flex-col m-0 pb-20">
			<div className='flex flex-col w-full bg-white p-3 mt-5 rounded-lg shadow-lg z-50'>
        <div>
          <CoursesBlock />
        </div>
      </div>
    </div>
	</>
	)
}

export default Courses