"use client"

import Image from "next/image";


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
			<h1 className='text-2xl font-medium text-[#835BD2]'>Преподаваемые языки</h1>
			<div className='grid grid-cols-1 gap-1 mt-6'>
				{user.teacherInfo.languages.map((data, key) => (
					<div key={key} className='w-full gap-5 rounded-xl transition-all'>
						{data.language === "China" ? 
					<div className="bg-[#f20520] p-4 overflow-hidden transition-all relative min-h-[120px] w-full flex flex-col justify-between rounded-xl shadow-lg">
						<Image src={"/dragon.png"} width={500} height={500} alt="dragonBg" className="absolute left-0 top-[-50px] opacity-35 w-full z-0"/>
						<h1 className="text-[#f7e627] text-3xl z-50" style={{fontFamily: "Belepotan"}}>
							Китайский язык
						</h1>
						<div className="z-50 text-white text-sm" style={{fontFamily: "Belepotan"}}>
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
									<div className="bg-[#4865d8] p-4 overflow-hidden relative min-h-[120px] flex flex-col justify-between rounded-xl shadow-lg">
										<h1 className="text-white text-3xl z-50" style={{fontFamily: "Corean"}}>
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
							<div className="bg-amber-500 w-full p-4 overflow-hidden transition-all relative min-h-[120px] flex flex-col justify-between rounded-xl shadow-lg">
								<Image src="/gr.png" alt="" width={400} height={400} className='absolute w-[6rem] h-[4rem] right-2 bottom-1 rotate-[-15deg]' />
								<h1 className="text-amber-900 text-3xl z-50 font-semibold">
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
							<div className="bg-[#ffe2ef] w-full p-4 overflow-hidden transition-all relative min-h-[120px] flex flex-col justify-between rounded-xl">
								<Image src={"/sacura.png"} width={500} height={500} alt="dragonBg" className="absolute right-[-10px] bottom-[-60px] opacity-45 z-0"/>
								<h1 className="text-[#b82761] text-3xl z-50" style={{fontFamily: "Belepotan"}}>
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
					</div>
		</div>
	)
}

export default LanguagesBlock