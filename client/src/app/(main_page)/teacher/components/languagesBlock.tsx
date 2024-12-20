"use client"

import Image from "next/image";
import { IoLanguage } from "react-icons/io5";
import { HashLoader, RingLoader } from "react-spinners";


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
}

const LanguagesBlock = ({user}: Props) => {
	return (
		<div>
			<h1 className='text-xl font-medium text-gray-500 text-center flex gap-2 items-center justify-center pb-2' >
				<IoLanguage className="text-white bg-gray-500 rounded-md h-6 w-6 p-1" />
				<span>Преподаваемые языки</span>
			</h1>
			<div className="h-[1px] w-full bg-gray-200"/>
			<div className='grid grid-cols-1 gap-1 mt-2'>
				{user.teacherInfo.languages.map((data, key) => (
					<div key={key} className='w-full gap-5 rounded-xl transition-all'>
						{data.language === "China" ? 
					<div className="bg-[#f20520] p-2 px-4 overflow-hidden transition-all relative min-h-[80px] w-full flex flex-col justify-between rounded-xl shadow-lg">
						<Image src={"/dragon.png"} width={500} height={500} alt="dragonBg" className="absolute left-0 top-[-50px] opacity-35 w-full z-0"/>
						<h1 className="text-[#f7e627] text-xl z-50" style={{fontFamily: "Belepotan"}}>
							Китайский язык
						</h1>
						<div className="z-50 text-white text-xs" style={{fontFamily: "Belepotan"}}>
							<div>
								Возраст:
										{data.prefers === "adults" && " Взрослые (18 лет и выше)"}
										{data.prefers === "teens" && " Подростки (12-16 лет)"}
										{data.prefers === "kids" && " Дети (до 12 лет)"}
										{data.prefers === "noMetter" && " Нет предпочтений"}
									</div>
									<p>Уровень: {data.level.toUpperCase()}</p>
								</div>
							</div> 
							: ""}
							{data.language === "English" ?
							<div className='relative transition-all'>
								<Image src={"/bus.png"} width={500} height={500} alt="dragonBg" className=" absolute right-[-10px] z-10 w-[26%] bottom-[-4px]"/>
									<div className="bg-[#4865d8] p-2 px-4 overflow-hidden relative min-h-[80px] flex flex-col justify-between rounded-xl shadow-lg">
										<h1 className="text-white text-xl z-50" style={{fontFamily: "Corean"}}>
											АНГЛИЙСКИЙ ЯЗЫК
										</h1>
										<div className="z-50 text-white text-sm font-semibold" style={{fontFamily: "Corean"}}>
											<div>
												Возраст:
												{data.prefers === "adults" && " Взрослые (18 лет и выше)"}
												{data.prefers === "teens" && " Подростки (12-16 лет)"}
												{data.prefers === "kids" && " Дети (до 12 лет)"}
												{data.prefers === "noMetter" && " Нет предпочтений"}
											</div>
											<p>Уровень: {data.level.toUpperCase()}</p>
										</div>
								</div>
							 </div>
							: ""}
							{data.language === "German" ? 
							<div className="bg-amber-500 w-full p-2 px-4 overflow-hidden transition-all relative min-h-[80px] flex flex-col justify-between rounded-xl shadow-lg">
								<Image src="/gr.png" alt="" width={400} height={400} className='absolute w-[6rem] h-[4rem] right-2 bottom-1 rotate-[-15deg]' />
								<h1 className="text-amber-900 text-xl z-50 font-semibold">
									НЕМЕЦКИЙ ЯЗЫК
								</h1>
								<div className="z-50 text-amber-900 text-sm font-semibold">
									<div>
										Возраст:
										{data.prefers === "adults" && " Взрослые (18 лет и выше)"}
										{data.prefers === "teens" && " Подростки (12-16 лет)"}
										{data.prefers === "kids" && " Дети (до 12 лет)"}
										{data.prefers === "noMetter" && " Нет предпочтений"}
									</div>
									<p>Уровень: {data.level.toUpperCase()}</p>
								</div>
							</div>
							: ""}
							{data.language === "Korean" ? 
							<div className="bg-[#ffe2ef] w-full p-2 px-4 overflow-hidden transition-all relative min-h-[80px] flex flex-col justify-between rounded-xl">
								<Image src={"/sacura.png"} width={500} height={500} alt="dragonBg" className="absolute right-[-10px] bottom-[-60px] opacity-45 z-0"/>
								<h1 className="text-[#b82761] text-xl z-50" style={{fontFamily: "Belepotan"}}>
									КОРЕЙСКИЙ ЯЗЫК
								</h1>
								<div className="z-50 text-[rgb(184,39,97)] text-sm font-medium " style={{fontFamily: "Belepotan"}}>
									<div>
										Возраст:
										{data.prefers === "adults" && " Взрослые (18 лет и выше)"}
										{data.prefers === "teens" && " Подростки (12-16 лет)"}
										{data.prefers === "kids" && " Дети (до 12 лет)"}
										{data.prefers === "noMetter" && " Нет предпочтений"}
									</div>
									<p>Уровень: {data.level.toUpperCase()}</p>
								</div>
						</div>
							: ""}
						</div>
						))}
						{user.teacherInfo.languages.length === 0 &&
							<div className="h-[300px] flex flex-col justify-center items-center">
								<h1 className="text-center text-gray-400 font-medium">Преподаватель еще не добавил языки</h1>
								<h1 className="text-center text-gray-400 font-medium">Просморите страницу позже</h1>
								<HashLoader color="#9ca3af" size={30} className="mt-5"/>
							</div>
						}
					</div>
		</div>
	)
}

export default LanguagesBlock