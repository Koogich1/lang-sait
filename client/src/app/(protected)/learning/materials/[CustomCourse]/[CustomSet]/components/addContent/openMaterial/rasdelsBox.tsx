import FindRasdels from '@/app/(main_page)/createCourses/watching/actions/findRasdels'
import { courseData, Lessons, rasdelId } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import LessonsBox from './lessonsBox'
import Image from 'next/image'
import findLessonsByRasdel from '@/app/(main_page)/createCourses/watching/actions/findLessonsByRasdel'
import { FaPlus } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import AddRasdel from '@/app/(main_page)/createCourses/watching/components/modal/adding/addRasdel'
import { useParams } from 'next/navigation'

type Props = {
	selectMaterial: courseData | null
}

const RasdelsList = ({ selectMaterial }: Props) => {
	const [rasdels, setRasdels] = useState<rasdelId[]>([]); 
	const [loading, setLoading] = useState<boolean>(true); 
	const [error, setError] = useState<string | null>(null); 
	const [lessonsByRasdel, setLessonsByRasdel] = useState<{ [key: string]: Lessons[] | null }>({});
	const [open, setOpen] = useState(false)
	const [rasdel, setRasdel] = useState<rasdelId>()

	const [choosenAccord, setChoosenAccord ] = useState<string>()
	const [openAccord, setOpenAccord] = useState(false)
	const {CustomSet} = useParams()

	useEffect(() => {
		const findRasdles = async () => {
			if (!selectMaterial) return;

			try {
				const rasdelInfo = await FindRasdels(selectMaterial.id);
				if (rasdelInfo) {
					setRasdels(rasdelInfo);
					const lessonsPromises = rasdelInfo.map(async (rasdel) => {
						const lessonsData = await findLessonsByRasdel(rasdel.id);
						return { id: rasdel.id, lessons: lessonsData };
					});
					const lessonsResults = await Promise.all(lessonsPromises);
					const lessonsMap: { [key: string]: Lessons[] | null } = {};
					lessonsResults.forEach(({ id, lessons }) => {
						lessonsMap[id] = lessons;
					});
					setLessonsByRasdel(lessonsMap);
				}
			} catch (err) {
				setError("Ошибка при загрузке разделов.");
			} finally {
				setLoading(false);
			}
		};

		findRasdles();
	}, [selectMaterial]);

	if (loading) return <div>Загрузка...</div>; 
	if (error) return <div>{error}</div>; 

	return (
		<div>
			{rasdels.length === 0 ? (
				<div>Нет доступных разделов.</div>
			) : (
				<Accordion type="single" collapsible className="w-full mt-5" >
					{rasdels.map((data) => (
						<AccordionItem key={data.id} value={data.id}>
							<AccordionTrigger onClick={() => {
								setOpenAccord(true) 
								setChoosenAccord(data.id)}
							}>
								<div className={`${openAccord && choosenAccord === data.id && ""} flex items-center z-10 justify-between w-full`}>
									<div className='flex gap-1 items-center'>
										<Image src={data.photoUrl} alt="logo" width={100} height={100} className='w-[4rem] h-[4rem] shadow-sm object-cover'/>
										<h1>{data.name}</h1>
									</div>
									<Button className={`bg-blue-400 text-white p-0 z-50 flex items-center justify-center rounded-full mr-3 h-8 w-8 hover:bg-blue-500 transition-all cursor-pointer ${openAccord && choosenAccord === data.id && "w-[227px] h-10 gap-3"}`}
										onClick={(e) => {
											e.stopPropagation(); // предотвращаем всплытие события
											setRasdel(data)
											setOpen(true)
										}}
									>
										<FaPlus className='text-lg'/>
										{openAccord && choosenAccord === data.id && <h1>Добавить весь раздел</h1>}
									</Button>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<LessonsBox rasdelId={data.id}/>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			)}
			<AddRasdel openModal={open} setOpenModal={setOpen} rasdelId={rasdel} customSet={CustomSet as string} />
		</div>
	);
}

export default RasdelsList;