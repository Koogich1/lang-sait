import { Button } from '@/components/ui/button'
import { UserSubscriptions } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

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
	userSubs: UserSubscriptions | undefined
	teacher: Teacher | null
}

const Employment = ({userSubs, teacher} : Props) => {
	if(!userSubs){
		return(
			<div className='py-4 px-2 flex flex-col h-[160px] items-center justify-center gap-5'>
				<h1 className='text-center text-lg text-[#835BD2] font-medium'>
					Приобретите ваш первый урок!
				</h1>
				<Link href={`/profile/buyLessons/${teacher?.id}`}>
					<Button variant={"shadow2"}>
						Перейти
					</Button>
				</Link>
			</div>
		)
	}
	return (
		<div className="flex items-center flex-col justify-between h-full py-4">
			<div className='font-semibold text-xl text-center text-[#835BD2] leading-4'>
				Можно забронировать:
			</div>
			<h1 className='text-[4rem] text-gray-400 p-0 leading-[3rem]'>
				{userSubs.LessonsPayd}
			</h1>
			<Button variant={"shadow2"} className='font-medium'>
				Купить уроки!
			</Button>
		</div>
	)
}

export default Employment