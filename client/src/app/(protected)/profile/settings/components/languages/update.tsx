"use client"

import { Language, languagePrefers } from "@prisma/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { divide } from "lodash"
import { Button } from "@/components/ui/button"
import updateUserLanguage from "./updateLanguage"

type Props = {
	language: Language
	update: () => void
	back: () => void
}
const Update = ({language, back, update}: Props) => {
	const [level, setLevel] = useState<string>("");
  const [prefers, setPrefers] = useState<languagePrefers | null>(null);
	const [updated, setUpdated] = useState(false)

	useEffect(() => {
		language&&
			setLevel(language.level)
			setPrefers(language.prefers)
	},[])
	
	const Submit = async() => {
		if(updated){
			await updateUserLanguage({level: level, languageId: language.id})
		}
	}
	
	return (
		<div>
				{language.language === "China" ? (
                    <>
                      <h1 className='text-base text-gray-400 font-medium'>Уровень знаний:</h1>
                      <Select value={level} onValueChange={(value) => 
												{setLevel(value)
												setUpdated(true)}
											}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите свой уровень знания языка"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HSK-1" className='text-base'>HSK-1</SelectItem>
                          <SelectItem value="HSK-2" className='text-base'>HSK-2</SelectItem>
                          <SelectItem value="HSK-3" className='text-base'>HSK-3</SelectItem>
                          <SelectItem value="HSK-4" className='text-base'>HSK-4</SelectItem>
                          <SelectItem value="HSK-5" className='text-base'>HSK-5</SelectItem>
                          <SelectItem value="HSK-6" className='text-base'>HSK-6</SelectItem>
                        </SelectContent>
                      </Select>
										</>
                  ) : ""}
                  {language.language === "Korean" ? (
                    <>
                      <h1 className='text-base text-gray-400 font-medium'>Уровень знаний:</h1>
                      <Select value={level} onValueChange={(value) => 
												{setLevel(value)
												setUpdated(true)}
											}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите свой уровень знания языка"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-гып" className='text-base'>1-гып</SelectItem>
                          <SelectItem value="2-гып" className='text-base'>2-гып</SelectItem>
                          <SelectItem value="3-гып" className='text-base'>3-гып</SelectItem>
                          <SelectItem value="4-гып" className='text-base'>4-гып</SelectItem>
                          <SelectItem value="5-гып" className='text-base'>5-гып</SelectItem>
                          <SelectItem value="6-гып" className='text-base'>6-гып</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  ) : ""}
                  {language.language === "English" ? (
                    <>
                      <h1 className='text-base text-gray-400 font-medium'>Уровень знаний:</h1>
                      <Select value={level} onValueChange={(value) => 
												{setLevel(value)
												setUpdated(true)}
											}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите свой уровень знания языка"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a1" className='text-base'>A1</SelectItem>
                          <SelectItem value="a2" className='text-base'>A2</SelectItem>
                          <SelectItem value="b1" className='text-base'>B1</SelectItem>
                          <SelectItem value="b2" className='text-base'>B2</SelectItem>
                          <SelectItem value="c1" className='text-base'>C1</SelectItem>
                          <SelectItem value="c2" className='text-base'>C2</SelectItem>
                        </SelectContent>
                      </Select>
											</>
                  ) : ""}
                  {language.language === "German" ? (
										<>
                      <h1 className='text-base text-gray-400 font-medium'>Уровень знаний:</h1>
                      <Select value={level} onValueChange={(value) => 
												{setLevel(value)
												setUpdated(true)}
											}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите свой уровень знания языка"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a1" className='text-base'>A1</SelectItem>
                          <SelectItem value="a2" className='text-base'>A2</SelectItem>
                          <SelectItem value="b1" className='text-base'>B1</SelectItem>
                          <SelectItem value="b2" className='text-base'>B2</SelectItem>
                          <SelectItem value="c1" className='text-base'>C1</SelectItem>
                          <SelectItem value="c2" className='text-base'>C2</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  ) 
                  : ""}
			<div className="flex gap-3 mt-3">
				<Button 
					className="w-1/2" 
					variant={"violetSelect"} 
					disabled={!updated} 
					onClick={() => {
            Submit()
            update()
            back()
          }}
				>
					Подтвердить
				</Button>
				<Button 
					className="w-1/2" 
					variant={"shadow2"}
					onClick={() => back()}
				>
					Отменить
				</Button>
			</div>
		</div>
	)
}

export default Update