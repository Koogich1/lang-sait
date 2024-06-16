"use client"

import Header from "../../../_components/header"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import createEmptyTeacherAvailability from "@/components/datePick/AllTimeLineCreate"
import { Button } from "@/components/ui/button"
import { useState } from "react"


const firstTimeChoosePage = () => {
	const [transition, setTransition] = useState(false);
	const [created, setCreated] = useState(false)

  const onSubmit = () => {
		setTransition(true)
		 	/*
				try {
				createEmptyTeacherAvailability().then(() => {
						setTransition(false);
					});
				} catch (error) {											УБРАТЬ КАК ЗАКОНЧУ ТЕСТЫ, ВСЕ РАБОТАЕТ
						setTransition(false);
					console.error(error);
					
				}
			*/
		setCreated(true)
  };

	useGSAP(() => {
		gsap.to("#header", {
			opacity: 1,
			duration: .5,
			delay: 0.3,
	});

		gsap.to("#section", {
			opacity: 1,
			duration: .5,
			delay: .5,
	});
	
		gsap.to("#title", {
		opacity: 1,
		duration: .5,
		delay: .6,
	});

		gsap.to("#text", {
			opacity: 1,
			duration: .5,
			delay: .7,
	});

		gsap.to("#button", {
			opacity: 1,
			duration: .5,
			delay: .8,
	});
	}, [])


	return(
		<div className="text-gray-400">
			<div id="header" className="opacity-0">
				<Header
					header="Настройки"
				/>
			</div>
			{created ? 
			<section className="w-full h-[70vh] flex items-center justify-center opacity-1" id="section">
				<div className="text-xl text-center mt-[8%] opacity-1 bg-white shadow-lg rounded-xl px-5 py-8 max-w-[630px] flex flex-col items-center justify-center">
					<h1 className="font-bold text-2xl opacity-0 text-[#835BD2]" id="title">
						Обратите внимание!
					</h1>
					<p id="text" className="font-base text-lg opacity-0 mt-3">
						В следующих окнах вы должны выбрать черновое расписание на все дни недели, позже, 
						по желанию, вы сможете убирать и добавлять свободные часы как вы пожелаете.
					</p>
					<div id="button" className="opacity-0 ">
						<Button variant="violetSelect" onClick={onSubmit} disabled={transition} className="text-base w-[200px] h-[50px] mt-5 shadow-lg">
							Далее
						</Button>
					</div>
				</div>
			</section>
			: 
			<section className="w-full h-[70vh] flex items-center justify-center opacity-1">
				<div>
					jhkhj
				</div>
			</section>
			}
		</div>
	)
}

export default firstTimeChoosePage