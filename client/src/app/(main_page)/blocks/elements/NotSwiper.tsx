"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

const NotSwiper = () => {
	return (
		<div className="grid sm:grid-cols-2 sm:items-start items-center gap-5 mt-10">
			<div className="w-full bg-[#F2E6F2] rounded-3xl shadow-lg flex items-center flex-col-reverse justify-center">
				<div className="flex flex-col gap-5 w-full px-4 pb-4 items-start">
					<h1 className="text-2xl font-semibold text-center">Дошколята</h1>
					<ul className="text-start list-disc pl-5 text-base font-light flex flex-col gap-2">
						<li>
							Учим <span className="font-semibold">читать, писать</span>
						</li>
						<li>
							Смотрим и разбираем{" "}
							<span className="font-semibold">мультфильмы</span>
						</li>
						<li>Уроки по 45 минут</li>
						<li>Удобный график</li>
						<li>
							<span className="font-semibold">Интерактивная</span> форма
							обучения
						</li>
					</ul>
					<Button
						variant="violetSelect"
						className="font-bold p-6 w-full rounded-lg bg-[#3E236C]"
					>
						Выбрать
					</Button>
				</div>
				<div className="flex justify-center mb-5">
					<Image
						alt="5yoBoy"
						src={"/5yoBoy.png"}
						width={600}
						height={600}
					/>
				</div>
			</div>

			<div className="w-full bg-[#D9E3EF] rounded-3xl shadow-lg flex items-center flex-col-reverse">
				<div className="flex flex-col gap-5 w-full px-4 pb-4 items-start text-[#354E6B]">
					<h1 className="text-2xl font-semibold">Группа 7+</h1>
					<ul className="text-start list-disc pl-5 text-base font-light">
                <li>
                  Раскрой мир языков{" "}<span className="font-semibold">через игры и рассказы!</span>
                </li>
                <li>
                  Учимся весело:{" "}
                  <span className="font-semibold">читаем, играем и фантазируем!</span>
                </li>
                <li>
                  Знакомимся с новыми словами через увлекательные мультфильмы!
                </li>
                <li>
                  Творим вместе: делаем проекты и учим язык в работе!
                </li>
              </ul>
					<Button
						variant="default"
						className="font-bold p-6 w-full rounded-lg bg-[#354E6B]"
					>
						Выбрать
					</Button>
				</div>
				<div className="flex justify-center mb-5">
					<Image
						alt="12yogirl"
						src={"/12yogirl.png"}
						width={1000}
						height={1000}
					/>
				</div>
			</div>

			<div className="w-full bg-[#E1F1EB] rounded-3xl shadow-lg flex items-center mt-5 flex-col-reverse">
				<div className="flex flex-col gap-5 w-full px-4 pb-4 items-start text-[#4B7564]">
					<h1 className="text-2xl font-semibold">Группа 15+</h1>
					<ul className="text-start list-disc pl-5 text-base font-light">
                <li>
                  Овладевай языком, открывая{" "} <span className="font-semibold">двери в международные карьеры!</span>
                </li>
                <li>
                  Углубляем навыки: от разговорных тем до сложных проектов!
                </li>
                <li>
                  Погружаемся в язык через{" "}<span className="font-semibold">музыку и литературу!</span>
                </li>
                <li>
                  Совершенствуй свои знания с современными материалами и курсами!
                </li>
              </ul>
					<Button
						variant="violetSelect"
						className="font-bold p-6 w-full rounded-lg bg-[#4B7564]"
					>
						Выбрать
					</Button>
				</div>
				<div className="flex justify-center mb-5">
					<Image
						alt="17yoBoy"
						src={"/17yoBoy.png"}
						width={1000}
						height={1000}
					/>
				</div>
			</div>

			<div className="w-full bg-[#EAE8F3] rounded-3xl shadow-lg flex items-center mt-5 flex-col-reverse">
				<div className="flex flex-col gap-5 w-full px-4 pb-4 items-start text-[#63607A]">
					<h1 className="text-2xl font-semibold">Группа 20+</h1>
					<ul className="text-start list-disc pl-5 text-base font-light">
                <li>
                  Говори на языке будущего,{" "} <span className="font-semibold">повышай свою конкурентоспособность!</span>
                </li>
                <li>
                  Научись думать и выражаться на любом языке с уверенностью!
                </li>
                <li>
                  Изучай актуальные темы и обсуждай их с партнёрами по всему миру!
                </li>
                <li>
                  Расширяй горизонты: от путешествий до карьерных возможностей!
                </li>
              </ul>
					<Button
						variant="violetSelect"
						className="font-bold p-6 w-full rounded-lg bg-[#63607A]"
					>
						Выбрать
					</Button>
				</div>
				<div className="flex justify-center mb-5">
					<Image
						alt="23yoWomen"
						src={"/23yoWomen.png"}
						width={1000}
						height={1000}
					/>
				</div>
			</div>
		</div>
	)
}

export default NotSwiper