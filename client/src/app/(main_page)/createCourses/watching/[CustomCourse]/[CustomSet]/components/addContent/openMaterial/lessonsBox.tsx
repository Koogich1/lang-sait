import { useEffect, useState, useRef } from "react";
import findLessonsByRasdel from "@/app/(main_page)/createCourses/watching/actions/findLessonsByRasdel";
import { Lessons } from "@prisma/client";
import { gsap } from "gsap"; // Импортируем GSAP
import { ClipLoader, HashLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import AddLesson from "@/app/(main_page)/createCourses/watching/components/modal/adding/addLesson";
import { useParams } from "next/navigation";

type Props = {
	rasdelId: string;
};

const LessonsBox = ({ rasdelId }: Props) => {
	const [lessons, setLessons] = useState<Lessons[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const lessonsBoxRef = useRef<HTMLDivElement[]>([]); // Массив рефов для каждого элемента
	const [lesson, setLesson] = useState<Lessons>();
	const [open, setOpen] = useState(false)
	const {CustomSet} = useParams()

	const findLessons = async () => {
		const lessonsData = await findLessonsByRasdel(rasdelId);
		if (lessonsData) {
			setLessons(lessonsData);
		}
		setLoading(false);
	};

	useEffect(() => {
		findLessons();
	}, [rasdelId]);

	useEffect(() => {
		if (lessons) {
			lessons.forEach((_, index) => {
				const delay = index * 0.2; // Задержка для каждого элемента
				gsap.fromTo(
					lessonsBoxRef.current[index],
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.5, delay } // Применение задержки
				);
			});
		}
	}, [lessons]); // Запускаем анимацию при изменении уроков

	// Функция для получения рефа
	const setRef = (el: HTMLDivElement) => {
		if (el && !lessonsBoxRef.current.includes(el)) {
			lessonsBoxRef.current.push(el);
		}
	};

	return (
		<div className="flex flex-col gap-1">
			{loading ? (
				<div className="flex items-center justify-center w-full gap-3 text-blue-400"><ClipLoader color="#60a5fa"/> Загрузка уроков...</div>
			) : (
				lessons && lessons.length > 0 ? (
					lessons.map((data) => (
						<div
							key={data.id}
							ref={setRef} // Применяем реф
							className="flex gap-1 justify-between items-center border-t border-gray-100 p-1 opacity-0"
						>
							<div className="flex gap-1 items-center">
								<img src={data.photoUrl} alt="" className="w-12 h-12 object-cover" />
								<h1>{data.name}</h1>
							</div>
							<Button className='bg-blue-400 text-white p-0 z-50 flex items-center justify-center rounded-full mr-3 h-8 w-8 hover:bg-blue-500 transition-all cursor-pointer'
								onClick={(e) => {
									e.stopPropagation(); // предотвращаем всплытие события
									setLesson(data)
									setOpen(true)
									}}
							>
								<FaPlus className='text-lg'/>
							</Button>
						</div>
					))
				) : (
					<div className="text-gray-400 flex items-center py-3 justify-center w-full gap-4">Нет доступных уроков <HashLoader color="#9ca3af" size={40}/></div>
				)
			)}
			<AddLesson openModal={open} setOpenModal={setOpen} lesson={lesson} customSet={CustomSet as string}/>
		</div>
	);
};

export default LessonsBox;