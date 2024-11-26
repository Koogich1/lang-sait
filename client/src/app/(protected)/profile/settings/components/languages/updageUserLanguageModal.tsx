"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Language } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import Update from "./update";
import deleteUserLanguage from "./deleteLanguage";

type Props = {
	openModal: boolean;
	setOpenModal: any;
	language: Language | null;
  visov: () => void
}

const UpdateUserLanguageModal = ({openModal, setOpenModal, language, visov}: Props) => {

	const[ active, setActive ] = useState<string>("none")

	if(!language){return}

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal} >
		<DialogContent>
			<DialogHeader>
			{language.language === "China" ? 
            <div className="bg-[#f20520] p-4 overflow-hidden transition-all relative min-h-[120px] w-full flex flex-col justify-between rounded-xl shadow-lg">
              <div className='flex items-center justify-center w-full h-full absolute opacity-0 hover:opacity-100 transition-opacity duration-300'>
                <div className='bg-gray-200 p-2 z-50 rounded-lg'>
                  <IoSettingsOutline className='text-gray-500 w-6 h-6'/>
                </div>
              </div>
              <Image src={"/dragon.png"} width={500} height={500} alt="dragonBg" className="absolute left-0 top-[-50px] opacity-35 w-full z-0"/>
              <h1 className="text-[#f7e627] text-3xl z-50" style={{fontFamily: "Belepotan"}}>
                Китайский язык
              </h1>
              <div className="z-50 text-white text-sm" style={{fontFamily: "Belepotan"}}>
                <div>
                  Возраст:
                  {language.prefers === "adults" && " Взрослые (18 лет и выше)"}
                  {language.prefers === "teens" && " Подростки (12-16 лет)"}
                  {language.prefers === "kids" && " Дети (до 12 лет)"}
                  {language.prefers === "noMetter" && " Нет предпочтений"}
                </div>
                <p>Уровень: {language.level.toUpperCase()}</p>
              </div>
            </div> 
            : ""}
            {language.language === "English" ?
            <div className='relative transition-all'>
              <Image src={"/bus.png"} width={500} height={500} alt="dragonBg" className=" absolute right-[-10px] z-10 w-[26%] bottom-[-4px]"/>
                <div className="bg-[#4865d8] p-4 overflow-hidden relative min-h-[120px] flex flex-col justify-between rounded-xl shadow-lg">
                  <h1 className="text-white text-3xl z-50" style={{fontFamily: "Corean"}}>
                    АНГЛИЙСКИЙ ЯЗЫК
                  </h1>
                  <div className="z-50 text-white text-sm font-semibold" style={{fontFamily: "Corean"}}>
                    <div>
                      Возраст:
                      {language.prefers === "adults" && " Взрослые (18 лет и выше)"}
                      {language.prefers === "teens" && " Подростки (12-16 лет)"}
                      {language.prefers === "kids" && " Дети (до 12 лет)"}
                      {language.prefers === "noMetter" && " Нет предпочтений"}
                    </div>
                    <p>Уровень: {language.level.toUpperCase()}</p>
                  </div>
              </div>
             </div>
            : ""}
            {language.language === "German" ? 
            <div className="bg-amber-500 w-full p-4 overflow-hidden transition-all relative min-h-[120px] flex flex-col justify-between rounded-xl shadow-lg">
              <Image src="/gr.png" alt="" width={400} height={400} className='absolute w-[6rem] h-[4rem] right-2 bottom-1 rotate-[-15deg]' />
              <h1 className="text-amber-900 text-3xl z-50 font-semibold">
                НЕМЕЦКИЙ ЯЗЫК
              </h1>
              <div className="z-50 text-amber-900 text-sm font-semibold">
                <div>
                  Возраст:
                  {language.prefers === "adults" && " Взрослые (18 лет и выше)"}
                  {language.prefers === "teens" && " Подростки (12-16 лет)"}
                  {language.prefers === "kids" && " Дети (до 12 лет)"}
                  {language.prefers === "noMetter" && " Нет предпочтений"}
                </div>
                <p>Уровень: {language.level.toUpperCase()}</p>
              </div>
            </div>
            : ""}
            {language.language === "Korean" ? 
            <div className="bg-[#ffe2ef] w-full p-4 overflow-hidden transition-all relative min-h-[120px] flex flex-col justify-between rounded-xl">
              <Image src={"/sacura.png"} width={500} height={500} alt="dragonBg" className="absolute right-[-10px] bottom-[-60px] opacity-45 z-0"/>
              <h1 className="text-[#b82761] text-3xl z-50" style={{fontFamily: "Belepotan"}}>
                КОРЕЙСКИЙ ЯЗЫК
              </h1>
              <div className="z-50 text-[rgb(184,39,97)] text-sm font-medium " style={{fontFamily: "Belepotan"}}>
                <div>
                  Возраст:
                  {language.prefers === "adults" && " Взрослые (18 лет и выше)"}
                  {language.prefers === "teens" && " Подростки (12-16 лет)"}
                  {language.prefers === "kids" && " Дети (до 12 лет)"}
                  {language.prefers === "noMetter" && " Нет предпочтений"}
                </div>
                <p>Уровень: {language.level.toUpperCase()}</p>
              </div>
          </div>
            : ""}
						<div className="w-full justify-start gap-3 pt-3 items-center flex border-b border-gray-200 pb-2">
							<Button 
								className={`px-3 py-2 border-2 ${active === "update" ? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 hover:text-white" : "bg-blue-100 border-blue-300 text-blue-400 hover:bg-blue-200 hover:text-blue-600 hover:border-blue-400"}`}
								variant={"shadow2" }
								onClick={() => {setActive("update")}}
							>Изменить</Button>
							<Button 
								className={`px-3 py-2 border-2 ${active === "delete" ? "bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 hover:text-white" : "bg-red-100 border-red-300 text-red-400 hover:bg-red-200 hover:text-red-600 hover:border-red-400"}`}
								variant={"shadow2" }
								onClick={() => {setActive("delete")}}
							>Удалить</Button>
						</div>
						<div>
							{active === "update" &&
						  	<Update language={language} back={() => setOpenModal(false)} update={() => visov()}/>
							}
              {active === "delete" &&
                <div className="text-gray-400 flex flex-col gap-5 mt-3">
                  <p className="text-lg text-red-500 font-medium">Вы действительно хотите удалить этот язык? Весь прогресс может быть сброшен, а преподаватели могут вас потерять!</p>
                  <div className="flex gap-3">
                    <Button 
                    className="w-1/2 bg-red-500 hover:bg-red-600"
                    variant={"violetSelect"}
                    onClick={() => {
                      deleteUserLanguage(language.id)
                      visov()
                      setOpenModal(false)
                    }}
                    >
                      Подтвердить
                    </Button>
                    <Button 
                      className="w-1/2" 
                      variant={"shadow2"}
                      onClick={() => setOpenModal(false)}
                    >
                      Отменить
                    </Button>
                  </div>
                </div>
              }
              {active === "none" && 
                <div>
                  <div className="text-lg mt-1 text-[#835BD2] flex items-center justify-center">
                    Удалите или измените настройки языка!
                  </div>
                  <Button variant={"shadow2"} className="w-full mt-3">Отменить</Button>
                </div>
              }
						</div>
			</DialogHeader>
		</DialogContent>
	</Dialog>
	)
}

export default UpdateUserLanguageModal