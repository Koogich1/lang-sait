"use client"

import { Button } from "@/components/ui/button"
import { Achievement, User } from "@prisma/client"
import { useState } from "react"
import { IoIosMail } from "react-icons/io"
import sendVerification from "../../actions/sendVerification"
import addCoinsAndUpdateAchivment from "../../actions/addCoinsAndUpdateAchivment"
import { motion } from "framer-motion"; // Импортируем фреймворк для анимации
import UpdateEmailModal from "../modal/updateEmailModal"

type Props ={
	achievement: Achievement,
	user: User,
	visov: () => void
}

const MailAccept = ({achievement, user, visov} : Props) => {
	const [coins, setCoins] = useState<number[]>([]); // Состояние для монеток
	const [clicked, setClicked] = useState(false)
	const [open, setOpen] = useState(false)

	const sendVerificationEmail = () => {
    setClicked(true);
    if (!user.email) return;
    sendVerification({ email: user.email, userId: user.id });
    setOpen(true);
  };

	const handleRewardClick = (achievement: Achievement, coinsAll: number) => {
		addCoinsAndUpdateAchivment(achievement, coinsAll, user.id);

		const newCoins = Array.from({ length: coinsAll }, (_, index) => Date.now() + index);
		setCoins(newCoins);

		// Плавное исчезновение конфетти
		setTimeout(() => {
			visov();
		}, 2500); // Задержка, чтобы конфетти показывалось немного дольше
	};

	const getRandomDirection = () => {
		const angle = Math.random() * 2 * Math.PI; // Случайный угол между 0 и 2π
		const x = Math.cos(angle) * 100; // Смещение по осям X
		const y = Math.sin(angle) * -100; // Смещение по осям Y (отрицательное для вверх)
		return { x, y };
	}

	return (
		<div  className={`w-full h-[9rem] rounded-lg border relative overflow-hidden flex gap-2 items-center justify-between flex-col border-[#cbbcea] ${achievement.isReverdReceived ? "border-gray-400 bg-white" : !user.emailVerified ? "border-[#835BD2]" : "border-yellow-500 bg-yellow-500"} p-1`}>
							<h1 className={`text-lg font-medium ${achievement.isReverdReceived ? "text-gray-400" : !user.emailVerified ? "text-[#835BD2]" : "text-white"} text-center border rounded-lg px-2 ${achievement.isReverdReceived ? "border-gray-400" : !user.emailVerified ? "border-[#835BD2]" : "border-yellow-500"}`}>{achievement.isReverdReceived ? "Почта подтверждена" : !user.emailVerified ? "Подтвердите почту" : "Почта подтверждена!"}</h1>
							<IoIosMail className={`absolute bottom-5 left-5 text-5xl scale-[300%] ${achievement.isReverdReceived ? "text-gray-400" : !user.emailVerified ? "text-[#835BD2]" : "text-white"} opacity-10 z-0`} />
							<IoIosMail className={`absolute top-[-10px] right-0 text-5xl scale-[300%] ${achievement.isReverdReceived ? "text-gray-400" : !user.emailVerified ? "text-[#835BD2]" : "text-white"} opacity-10 z-0`} />
							<div className={`text-lg font-light text-center border rounded-lg px-3 ${achievement.isReverdReceived ? "text-gray-400 border-gray-400" : !user.emailVerified ? "text-[#835BD2] border-[#835BD2]" : "text-white border-white"}`}>
								{user.email}
							</div>
							{!user.emailVerified ? 
								<Button
									variant={"violetSelect"} 
									className="text-sm font-medium" 
									onClick={sendVerificationEmail}
								>
									Выслать письмо 
								</Button>
							: 
							achievement.isReverdReceived ? 
								<div>
									<Button className="opacity-100 bg-gray-200 z-50" variant={"shadow2"}>Награда получена</Button>
								</div>
								:
									<div>
										<div>
										<Button 
											variant={"shadow2"} 
											className="text-yellow-200 bg-yellow-600 hover:bg-yellow-700 h-9 hover:text-yellow-300 relative"
											onClick={() => {handleRewardClick(achievement, 5)}} // Добавляем обработчик клика
											disabled={clicked}
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
								<UpdateEmailModal open={open} setOpen={setOpen} visov={() => {
									visov(),
									setOpen(false)
								}} />
						</div>
	)
}

export default MailAccept