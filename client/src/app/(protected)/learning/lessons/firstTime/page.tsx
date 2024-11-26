"use client"

import Header from "../../components/header"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import createEmptyTeacherAvailability from "@/components/datePick/AllTimeLineCreate"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FirstTimeInputForm } from "@/components/datePick/pub/firstInputForm"

type Props = {
	visov: () => void
}

const FirstTimeChoosePage = ({visov}: Props) => {  // Changed to start with an uppercase letter
	const [transition, setTransition] = useState(false);
	const [created, setCreated] = useState(false)

  const onSubmit = () => {
		setTransition(false);
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

	useGSAP(() => {
		if (created) {
			gsap.to("#section", {
				opacity: 0,
				duration: 0.5,
			});

			gsap.to("#created-section", {
				opacity: 1,
				duration: 0.5,
				delay: 0.5,
			});
		}
	}, [created]);

	return (
		<div className="text-gray-400">
			{created ? 
				<section className="w-full h-[70vh] flex items-center justify-center opacity-1 ml-6" id="created-section">
					<div className="text-xl text-center opacity-1 rounded-xl px-2 relative py-2 flex flex-col items-center justify-between bg-white shadow-lg">
						<FirstTimeInputForm visov={() => {
							visov()
						}}/>
					</div>
				</section>
			:
				<section className="w-full h-[70vh] flex items-center justify-center opacity-0" id="section">
					<div className="text-xl text-center mt-[8%] opacity-1 bg-white shadow-lg rounded-xl px-5 py-8 max-w-[630px] flex flex-col items-center justify-center">
						<h1 className="font-bold text-2xl opacity-0 text-[#835BD2]" id="title">
							Обратите внимание!
						</h1>
						<p id="text" className="font-base text-lg opacity-0 mt-3">
							В следующих окнах вы должны провести начальную настройку для работы в системе, нажимая кнопку далее вы соглашаетесь с <a href="#">договором об оказании услуг</a> а также с <a href="#">афертой</a>
						</p>
						<div id="button" className="opacity-0 ">
							<Button variant="violetSelect" onClick={onSubmit} disabled={transition} className="text-base w-[200px] h-[50px] mt-5 shadow-lg">
								Далее
							</Button>
						</div>
					</div>
				</section>
			}
		</div>
	)
}

export default FirstTimeChoosePage; // Updated export statement
