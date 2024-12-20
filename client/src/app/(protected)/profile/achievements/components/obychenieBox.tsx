"use client"

import { Button } from "@/components/ui/button"
import { MdAlternateEmail } from "react-icons/md"
import { Achievement, Language, User } from "@prisma/client"
import { useEffect, useState } from "react"
import sendVerification from "../actions/sendVerification"
import { IoCheckbox, IoLanguage, IoSettingsOutline } from "react-icons/io5"
import UpdateEmailModal from "./modal/updateEmailModal"
import Confetti from 'react-confetti'
import { useWindowSize } from '@react-hook/window-size'
import { motion } from "framer-motion"; // Импортируем фреймворк для анимации
import addCoinsAndUpdateAchivment from "../actions/addCoinsAndUpdateAchivment"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

import { RxAvatar } from "react-icons/rx";
import Link from "next/link"
import { IoIosMail, IoMdInformationCircleOutline } from "react-icons/io"
import MailAccept from "./achivments/mailAccept"

type Props = {
	visov: () => void,
	user: User,
	emailVerified: boolean,
	achivments: Achievement[],
	languages: Language[] | null,
}

const ObychenieBox = ({ visov, user, emailVerified, achivments, languages}: Props) => {
	const [clicked, setClicked] = useState(false)
	const [open, setOpen] = useState(false)
	const [width, height] = useWindowSize()
	const [showConfetti, setShowConfetti] = useState(false); // Состояние для конфетти
	const [coins, setCoins] = useState<number[]>([]); // Состояние для монеток

	const sendVerificationEmail = () => {
    setClicked(true);
    if (!user.email) return;
    sendVerification({ email: user.email, userId: user.id });
    setOpen(true);
  };

		const handleRewardClick = (achievement: Achievement, coinsAll: number) => {
			setShowConfetti(true);
			addCoinsAndUpdateAchivment(achievement, coinsAll, user.id);

			const newCoins = Array.from({ length: coinsAll }, (_, index) => Date.now() + index);
			setCoins(newCoins);

			// Плавное исчезновение конфетти
			setTimeout(() => {
				setShowConfetti(false);
				visov();
			}, 2500); // Задержка, чтобы конфетти показывалось немного дольше
		};

	const getRandomDirection = () => {
		const angle = Math.random() * 2 * Math.PI; // Случайный угол между 0 и 2π
		const x = Math.cos(angle) * 100; // Смещение по осям X
		const y = Math.sin(angle) * -100; // Смещение по осям Y (отрицательное для вверх)
		return { x, y };
	}

	useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

	return (
		<>
			{showConfetti && 
        <motion.div
          initial={{ opacity: 0 }} // Начальная прозрачность
          animate={{ opacity: 1 }} // Полная непрозрачность
          exit={{ opacity: 0 }} // Прозрачность при выходе
          transition={{ duration: 1 }} // Длительность анимации
        >
          <Confetti
            width={width}
            height={height}
            run={showConfetti}
          />
        </motion.div>
      }
			<div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 w-full mt-5 gap-3">
			{achivments.map((data, index) => (
				<div key={index} className="w-full h-[9rem] shadow-md rounded-lg">
					{data.type === "mail_accept" && 
						<MailAccept user={user} achievement={data} visov={visov}/>
					}
					{data.type === "avatar_update" && 
						<div  className={`w-full h-[9rem]  gap-2 rounded-lg border relative overflow-hidden flex items-center justify-between flex-col pb-3 border-[#cbbcea] ${data.isReverdReceived ? "border-gray-400 bg-white" : user.image === "https://storage.yandexcloud.net/langschoolacynberg/images/user.png" ? "border-blue-400" : "border-yellow-500 bg-yellow-500"} p-1`}>
							<h1 className={`text-lg font-medium ${data.isReverdReceived ? "text-gray-400" : user.image === "https://storage.yandexcloud.net/langschoolacynberg/images/user.png" ? "text-blue-400" : "text-white"} text-center border rounded-lg px-2 ${data.isReverdReceived ? "border-gray-400" : user.image === "https://storage.yandexcloud.net/langschoolacynberg/images/user.png" ? "border-blue-400" : "border-yellow-500"}`}>
								{data.isReverdReceived ? "Аватар изменен" : !emailVerified ? "Измените Аватар" : "Аватар изменен!"}
							</h1>
							<RxAvatar className={`absolute bottom-5 left-5 text-5xl scale-[300%] ${data.isReverdReceived ? "text-gray-400" : user.image === "https://storage.yandexcloud.net/langschoolacynberg/images/user.png" ? "text-blue-400" : "text-white"} opacity-10 z-0`} />
							<RxAvatar className={`absolute top-[-10px] right-0 text-5xl scale-[300%] ${data.isReverdReceived ? "text-gray-400" : user.image === "https://storage.yandexcloud.net/langschoolacynberg/images/user.png" ? "text-blue-400" : "text-white"} opacity-10 z-0`} />
							{user.image ? <Image src={user.image} alt="avatar" width={50} height={50} className="rounded-full shadow-md border border-gray-100"/> : <Skeleton />}
							{user.image === "https://storage.yandexcloud.net/langschoolacynberg/images/user.png" ? 
								<Link href={"/profile/settings"}>
									<Button 
										variant={"violetSelect"} 
										className="text-sm font-medium h-9 bg-blue-400 hover:bg-blue-500" 
									>
										В настройки!
									</Button>
								</Link>
							: 
								data.isReverdReceived ? 
								<div>
									<Button className="opacity-100 bg-gray-200 z-50" variant={"shadow2"}>Награда получена</Button>
								</div>
								:
									<div>
										<div>
										<Button 
											variant={"shadow2"} 
											className="text-yellow-200 bg-yellow-600 hover:bg-yellow-700 h-9 hover:text-yellow-300 relative"
											onClick={() => {handleRewardClick(data, 5)}} // Добавляем обработчик клика
										>
											Получить награду
											<span className="w-6 h-6 bg-yellow-600 text-yellow-200 flex items-center justify-center rounded-full border-yellow-400 border-2 absolute top-[-10px] right-[-10px]">
												5
											</span>
											</Button>
											{/* Отображаем монеты */}
											{coins.map((coin, index) => {
												const { x, y } = getRandomDirection(); // Получаем случайные направления
												return (
													<motion.div
														key={coin}
														className="absolute w-4 h-4 bg-yellow-600 rounded-full border-2 border-yellow-500 text-yellow-300 flex items-center justify-center text-lg"
														style={{
															top: '50%', 
															left: '50%',
														}}
														initial={{ y: 20, opacity: 1 }}
														animate={{ 
															y: y, 
															x: x, 
															opacity: 0 
														}} // Анимация вылета монеты в случайное направление
														transition={{ duration: 0.5, delay: index * 0.1 }} // Задержка для поочередного вылета
													>
														$
													</motion.div>
												)
											})}
										</div>
									</div>
								}
						</div>
					}
					{data.type === "language_add" && 
						<div  className={`w-full h-[9rem] gap-2 rounded-lg border relative overflow-hidden flex items-center justify-between flex-col border-[#cbbcea] ${data.isReverdReceived ? "border-gray-400 bg-white" : languages && languages?.length === 0 ? "border-blue-400" : "border-yellow-500 bg-yellow-500"} p-1`}>
							<h1 className={`text-lg font-medium ${data.isReverdReceived ? "text-gray-400" : languages && languages?.length === 0 ? "text-blue-400" : "text-white"} text-center border rounded-lg px-2 ${data.isReverdReceived ? "border-gray-400" : languages && languages?.length === 0 ? "border-blue-400" : "border-yellow-500"}`}>
								{data.isReverdReceived ? "Язык добавлен" : languages && languages?.length === 0 ? "Добавьте язык" : "Язык добавлен!"}
							</h1>
							<IoLanguage className={`absolute bottom-5 left-5 text-5xl scale-[300%] ${data.isReverdReceived ? "text-gray-400" : languages && languages?.length === 0 ? "text-blue-400" : "text-white"} opacity-10 z-0`} />
							<IoLanguage className={`absolute top-[-10px] right-0 text-5xl scale-[300%] ${data.isReverdReceived ? "text-gray-400" : languages && languages?.length === 0 ? "text-blue-400" : "text-white"} opacity-10 z-0`} />
							{languages && languages?.length === 0 ? 
								<Link href={"/profile/settings"}>
									<Button 
										variant={"violetSelect"} 
										className="text-sm font-medium h-9 bg-blue-400 hover:bg-blue-500" 
									>
										В настройки!
									</Button>
								</Link>
							: 
							<>
								<div>
								{languages && languages.slice(0, 1).map((data) => (
									<div key={data.id} className='w-full cursor-pointer rounded-xl hover:bg-black transition-all'
										onClick={() => {}}
									>
										{data.language === "China" ? 
										<div className="bg-[#f20520] p-2 overflow-hidden transition-all relative min-h-[40px] hover:opacity-70 w-full flex flex-col justify-between rounded-xl shadow-lg">
											<div className='flex items-center justify-center w-full h-full absolute opacity-0 hover:opacity-100 transition-opacity duration-300'>
												<div className='bg-gray-200 p-2 z-50 rounded-lg'>
													<IoSettingsOutline className='text-gray-500 w-6 h-6'/>
												</div>
											</div>
											<Image src={"/dragon.png"} width={500} height={500} alt="dragonBg" className="absolute left-0 top-[-50px] opacity-35 w-full z-0"/>
											<h1 className="text-[#f7e627] text-2xl z-50 text-center" style={{fontFamily: "Belepotan"}}>
												Китайский язык
											</h1>
										</div> 
										: ""}
										{data.language === "English" ?
										<div className='relative hover:opacity-70 transition-all'>
											<Image src={"/bus.png"} width={500} height={500} alt="dragonBg" className=" absolute right-[-15px] z-10 w-[26%] bottom-[-4px]"/>
												<div className="bg-[#4865d8] p-2 overflow-hidden relative min-h-[60px] flex flex-col justify-between rounded-xl shadow-lg">
													<h1 className="text-white text-xl z-50" style={{fontFamily: "Corean"}}>
														АНГЛИЙСКИЙ ЯЗЫК
													</h1>
											</div>
										</div>
										: ""}
										{data.language === "German" ? 
										<div className="bg-amber-500 w-full p-2 overflow-hidden transition-all hover:opacity-70 relative min-h-[40px] flex flex-col justify-between rounded-xl shadow-lg">
											<Image src="/gr.png" alt="" width={100} height={100} className='absolute w-[3rem] h-[2rem] right-[-1rem] bottom-1 rotate-[-15deg]' />
											<h1 className="text-amber-900 text-2xl text-center z-50 font-semibold">
												НЕМЕЦКИЙ ЯЗЫК
											</h1>
										</div>
										: ""}
										{data.language === "Korean" ? 
										<div className="bg-[#ffe2ef] w-full p-2 overflow-hidden transition-all hover:opacity-70 relative min-h-[40px] flex flex-col justify-between rounded-xl">
											<Image src={"/sacura.png"} width={500} height={500} alt="dragonBg" className="absolute right-[-10px] bottom-[-60px] opacity-45 z-0"/>
											<h1 className="text-[#b82761] text-2xl text-center xl z-50" style={{fontFamily: "Belepotan"}}>
												КОРЕЙСКИЙ ЯЗЫК
											</h1>
									</div>
										: ""}
									</div>
								))}
								</div>
								{data.isReverdReceived ? 
								<div>
									<Button className="opacity-100 bg-gray-200 z-50" variant={"shadow2"}>Награда получена</Button>
								</div>
								:
									<div>
										<div>
										<Button 
											variant={"shadow2"} 
											className="text-yellow-200 bg-yellow-600 hover:bg-yellow-700 h-9 hover:text-yellow-300 relative"
											onClick={() => {handleRewardClick(data, 5)}} // Добавляем обработчик клика
										>
											Получить награду
											<span className="w-6 h-6 bg-yellow-600 text-yellow-200 flex items-center justify-center rounded-full border-yellow-400 border-2 absolute top-[-10px] right-[-10px]">
												5
											</span>
											</Button>
											{/* Отображаем монеты */}
											{coins.map((coin, index) => {
												const { x, y } = getRandomDirection(); // Получаем случайные направления
												return (
													<motion.div
														key={coin}
														className="absolute w-4 h-4 bg-yellow-600 rounded-full border-2 border-yellow-500 text-yellow-300 flex items-center justify-center text-lg"
														style={{
															top: '50%', 
															left: '50%',
														}}
														initial={{ y: 20, opacity: 1 }}
														animate={{ 
															y: y, 
															x: x, 
															opacity: 0 
														}} // Анимация вылета монеты в случайное направление
														transition={{ duration: 0.5, delay: index * 0.1 }} // Задержка для поочередного вылета
													>
														$
													</motion.div>
												)
											})}
										</div>
									</div>}
									</>
								}
						</div>
					}
					{data.type === "age_update" && 
					<div  className={`w-full h-[9rem] rounded-lg border relative overflow-hidden flex gap-2 items-center justify-between flex-col border-[#cbbcea] ${data.isReverdReceived ? "border-gray-400 bg-white" : user.age === 0 ? "border-green-600" : "border-yellow-500 bg-yellow-500"} p-1`}>
						<h1 className={`text-lg font-medium ${data.isReverdReceived ? "text-gray-400" : user.age === 0 ? "text-green-600" : "text-white"} text-center border rounded-lg px-2 ${data.isReverdReceived ? "border-gray-400" : user.age === 0 ? "border-green-600" : "border-yellow-500"}`}>{data.isReverdReceived ? "Возраст изменен" : user.age === 0 ? "Измените возраст" : "Возраст изменен!"}</h1>
						<IoMdInformationCircleOutline className={`absolute bottom-5 left-5 text-5xl scale-[300%] ${data.isReverdReceived ? "text-gray-400" : user.age === 0 ? "text-green-600" : "text-white"} opacity-10 z-0`} />
						<IoMdInformationCircleOutline className={`absolute top-[-10px] right-0 text-5xl scale-[300%] ${data.isReverdReceived ? "text-gray-400" : user.age === 0 ? "text-green-600" : "text-white"} opacity-10 z-0`} />
						<div className={`text-4xl font-bold text-center rounded-lg px-3 h-12 flex items-center justify-center ${data.isReverdReceived ? "text-gray-400 bg-gray-100" : user.age === 0 ? "text-green-500 bg-green-200" : "text-white"}`}>
							{user.age}
						</div>
						{user.age === 0 ? 
							<Link href={"/profile/settings"}>
								<Button 
									variant={"violetSelect"} 
									className="text-sm font-medium h-9 bg-green-500 hover:bg-green-600" 
								>
									В настройки!
								</Button>
							</Link>
						: 
							data.isReverdReceived ? 
							<div>
								<Button className="opacity-100 bg-gray-200 z-50" variant={"shadow2"}>Награда получена</Button>
							</div>
							:
								<div>
									<div>
									<Button 
										variant={"shadow2"} 
										className="text-yellow-200 bg-yellow-600 hover:bg-yellow-700 h-9 hover:text-yellow-300 relative"
										onClick={() => {handleRewardClick(data, 5)}} // Добавляем обработчик клика
									>
										Получить награду
										<span className="w-6 h-6 bg-yellow-600 text-yellow-200 flex items-center justify-center rounded-full border-yellow-400 border-2 absolute top-[-10px] right-[-10px]">
											5
										</span>
										</Button>
										{/* Отображаем монеты */}
										{coins.map((coin, index) => {
											const { x, y } = getRandomDirection(); // Получаем случайные направления
											return (
												<motion.div
													key={coin}
													className="absolute w-4 h-4 bg-yellow-600 rounded-full border-2 border-yellow-500 text-yellow-300 flex items-center justify-center text-lg"
													style={{
														top: '50%', 
														left: '50%',
													}}
													initial={{ y: 20, opacity: 1 }}
													animate={{ 
														y: y, 
														x: x, 
														opacity: 0 
													}} // Анимация вылета монеты в случайное направление
													transition={{ duration: 0.5, delay: index * 0.1 }} // Задержка для поочередного вылета
												>
													$
												</motion.div>
											)
										})}
									</div>
								</div>
							}
					</div>
					}
					{data.type === "teacherAdded" && 
					<div  className={`w-full h-[9rem] rounded-lg border relative overflow-hidden flex gap-2 items-center justify-between flex-col border-[#cbbcea] ${data.isReverdReceived ? "border-gray-400 bg-white" : user.age === 0 ? "border-green-600" : "border-yellow-500 bg-yellow-500"} p-1`}>
						<h1 className={`text-lg font-medium ${data.isReverdReceived ? "text-gray-400" : user.TeacherS.length === 0 ? "text-green-600" : "text-white"} text-center border rounded-lg px-2 ${data.isReverdReceived ? "border-gray-400" : user.age === 0 ? "border-green-600" : "border-yellow-500"}`}>{data.isReverdReceived ? "Учитель добавлен" : user.age === 0 ? "Добавьте учителя" : "Учитель добавлен!"}</h1>
						<IoMdInformationCircleOutline className={`absolute bottom-5 left-5 text-5xl scale-[300%] ${data.isReverdReceived ? "text-gray-400" : user.TeacherS.length === 0 ? "text-green-600" : "text-white"} opacity-10 z-0`} />
						<IoMdInformationCircleOutline className={`absolute top-[-10px] right-0 text-5xl scale-[300%] ${data.isReverdReceived ? "text-gray-400" : user.TeacherS.length === 0 ? "text-green-600" : "text-white"} opacity-10 z-0`} />
						
						{user.TeacherS.length === 0 ? 
							<Link href={"/profile/settings"}>
								<Button 
									variant={"violetSelect"} 
									className="text-sm font-medium h-9 bg-green-500 hover:bg-green-600" 
								>
									В настройки!
								</Button>
							</Link>
						: 
							data.isReverdReceived ? 
							<div>
								<Button className="opacity-100 bg-gray-200 z-50" variant={"shadow2"}>Награда получена</Button>
							</div>
							:
								<div>
									<div>
									<Button 
										variant={"shadow2"} 
										className="text-yellow-200 bg-yellow-600 hover:bg-yellow-700 h-9 hover:text-yellow-300 relative"
										onClick={() => {handleRewardClick(data, 5)}} // Добавляем обработчик клика
									>
										Получить награду
										<span className="w-6 h-6 bg-yellow-600 text-yellow-200 flex items-center justify-center rounded-full border-yellow-400 border-2 absolute top-[-10px] right-[-10px]">
											5
										</span>
										</Button>
										{/* Отображаем монеты */}
										{coins.map((coin, index) => {
											const { x, y } = getRandomDirection(); // Получаем случайные направления
											return (
												<motion.div
													key={coin}
													className="absolute w-4 h-4 bg-yellow-600 rounded-full border-2 border-yellow-500 text-yellow-300 flex items-center justify-center text-lg"
													style={{
														top: '50%', 
														left: '50%',
													}}
													initial={{ y: 20, opacity: 1 }}
													animate={{ 
														y: y, 
														x: x, 
														opacity: 0 
													}} // Анимация вылета монеты в случайное направление
													transition={{ duration: 0.5, delay: index * 0.1 }} // Задержка для поочередного вылета
												>
													$
												</motion.div>
											)
										})}
									</div>
								</div>
							}
					</div>
					}
				</div>
			))}
		</div>
			</>
	)
}

export default ObychenieBox