import React, { useState } from 'react'
import VideoTeacher from '../../addTeacher/modal/videoTeacher'
import PriseList from '../../addTeacher/modal/priseList'
import WaitAccess from '../../addTeacher/modal/waitAccess'
import Image from 'next/image';
import { FaAngleDown, FaDollarSign, FaPlay, FaRegUser } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import VideoModal from './modal/videoModal';
import ImageWatch from '@/app/(protected)/learning/settings/components/modal/imageWatch';
import ProfileImageWatch from '@/app/(protected)/learning/settings/components/modal/profileImageWatch';

const truncateText = (text: string, maxLength: number) => {
	if (text.length <= maxLength) {
		return text;
	}
	return text.substring(0, maxLength) + '...';
};

type Teacher = {
  id: string;
  teacherId: string;
  videoSrc: string; // Добавлено поле videoSrc
  userInfo: {
    image: string | null;
    name: string | null;
    surname: string | null;
  };
  teacherInfo: {
    aboutMe: string;
		images: string[];
    languages: {
      language: string; // Убедитесь, что тут у вас правильный тип
      level: string;
      prefers: string; // Или используйте ваш enum
    }[];
    lessonPrise: number;
  };
};

type Props = {
	user: Teacher
	isTeacherAdded: boolean
	isUserStudent: boolean
}


const UserBlock = ({user, isTeacherAdded, isUserStudent}: Props) => {
	const { teacherId } = useParams()

	const [open, setOpen] = useState<boolean>(false)
	const [openPrise, setOpenPrise] = useState(false)
	const [full, setFull] = useState<boolean>(false)
	const [openImage, setOpenImage] = useState(false)
 
	return (
		<div className='z-50 bg-white w-full'>
			<div className="w-full md:hidden text-center font-medium text-gray-500 text-xl pb-2 flex gap-2 items-center justify-center flex-col">
							<div className='flex gap-2'>
								<FaRegUser className='text-white bg-gray-500 rounded-md h-6 w-6 p-1'/>
								Информация о учителе
							</div>
							<div className='w-full h-[1px] bg-gray-200'/>
						</div>
		<div className="min-h-[280px] w-full xl:min-h-[350px] top-0 flex flex-col md:flex-row justify-between">
					<div className="flex flex-col items-center justify-center min-h-[310px] relative w-full md:w-1/3 border border-gray-200 rounded-lg">
						<div className='md:w-[180px] md:h-[180px] bg-black rounded-xl'>
							<Image
								src={user?.userInfo.image ? user?.userInfo.image : ""}
								alt="Avatar"
								width={180}
								height={180}
								className="shadow-sm object-cover rounded-xl hover:opacity-60 transition-all cursor-pointer"
								onClick={() => {setOpenImage(true)}}
							/>
						</div>
						<p className="font-semibold text-xl text-gray-400 py-2">
							{user?.userInfo.name + " " + user?.userInfo.surname}
						</p>
						<div
							className="absolute w-7 h-7 rounded-sm bg-red-100 text-red-400 hover:bg-red-200 hover:text-red-500 top-1 right-1 transition-all flex items-center justify-center cursor-pointer"
							onClick={() => { setOpen(true) }}
						>
							<FaPlay />
						</div>
						<div
							className="absolute w-7 h-7 rounded-sm bg-green-100 text-green-500 hover:bg-green-200 hover:text-green-600 top-1 left-1 transition-all flex items-center justify-center cursor-pointer"
							onClick={() => { setOpenPrise(true) }}
						>
							<FaDollarSign />
						</div>
					</div>
					<div className="w-full md:w-2/3 pl-4 flex flex-col justify-between">
						<div className="w-full text-center font-medium text-gray-500 text-xl pb-2 flex gap-2 items-center justify-center flex-col">
							<div className='hidden md:flex gap-2'>
								<FaRegUser className='text-white bg-gray-500 rounded-md h-6 w-6 p-1'/>
								Информация о учителе
							</div>
							<div className='w-full h-[1px] bg-gray-200'/>
						</div>
						<div
							className="hover:bg-gray-100 rounded-xl p-2 text-center cursor-pointer w-full transition-all"
							onClick={() => { setFull(!full) }}
						>
							<div
								className={`overflow-hidden transition-all duration-300 ease-in-out ${
									full ? "max-h-screen" : "max-h-[150px]"
								}`}
							>
								<p className={`text-sm select-none text-gray-400`}>
									{full ? user.teacherInfo.aboutMe : truncateText(user.teacherInfo.aboutMe, 300)}
								</p>
							</div>
							<p className={`text-2xl w-full text-gray-400 flex justify-center transition-transform duration-300 ease-in-out ${full ? "rotate-180" : "block"}`}>
								<FaAngleDown />
							</p>
						</div>
						<div>
							{
							isUserStudent ? 
								<Button variant={"violetSelect"} className='bg-green-500 hover:bg-green-600 text-base font-medium'>
									Уже добавлен!
								</Button>
							: 
								isTeacherAdded ? 
								<Button className='font-medium' variant={"violetSelect"} disabled>
									Заявка отправлена
								</Button>
								:
								<Link href={`/addTeacher/${teacherId}`}>
									<Button className='font-medium' variant={"violetSelect"}>
										Отправить заявку
									</Button>
								</Link>
							}
						</div>
					</div>
				</div>
				<VideoTeacher openModal={open} setOpenModal={setOpen} videoSrc={user?.videoSrc ? user.videoSrc : ""} />
				<PriseList openModal={openPrise} setOpenModal={setOpenPrise} teacher={user} />
				<ProfileImageWatch openModal={openImage} setOpenModal={setOpenImage} activeImage={user?.userInfo.image ? user?.userInfo.image : ""} teacherId={user.teacherId}/>
			</div>
	)
}

export default UserBlock