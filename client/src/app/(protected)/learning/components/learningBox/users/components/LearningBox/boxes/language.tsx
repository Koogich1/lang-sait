"use client"

import { Language } from "@prisma/client"
import Image from "next/image"

type Props = {
	language: Language | null
}

const Languages = ({language} : Props) => {
	return (
		<div className="w-[15%]">
			{language && 
					(
						<div>
							{language.language === "China" ? 
								<div className={`bg-[#f20520] p-2 overflow-hidden hover:opacity-100 hover:scale-105 cursor-pointer transition-all relative max-h-[40px] w-full flex flex-col justify-between rounded-lg shadow-lg`}>
									<Image src={"/dragon.png"} width={500} height={500} alt="dragonBg" className="absolute left-0 top-[-50px] opacity-35 w-full z-0"/>
										<h1 className="text-[#f7e627] text-sm z-50 text-center" style={{fontFamily: "Belepotan"}}>
											Китайский
										</h1>
									</div> 
													: ""}
													{language.language === "English" ?
													<div className={`relative hover:opacity-100 hover:scale-105 cursor-pointer transition-all`}>
														<Image src={"/bus.png"} width={500} height={500} alt="dragonBg" className=" absolute right-[-15px] z-10 w-[26%] bottom-[-4px]"/>
															<div className="bg-[#4865d8] p-2 overflow-hidden relative max-h-[40px] flex flex-col justify-between rounded-lg shadow-lg">
																<h1 className="text-white text-sm z-50" style={{fontFamily: "Corean"}}>
																	Английский
																</h1>
														</div>
													</div>
													: ""}
													{language.language === "German" ? 
													<div className={`bg-amber-500 w-full p-2 overflow-hidden transition-all hover:opacity-100 hover:scale-105 cursor-pointer relative max-h-[40px] flex flex-col justify-between rounded-lg shadow-lg`}>
														<h1 className="text-amber-900 text-sm text-center z-50 font-semibold">
															НЕМЕЦКИЙ
														</h1>
													</div>
													: ""}
													{language.language === "Korean" ? 
													<div className={`bg-[#ffe2ef] w-full p-2 overflow-hidden transition-all hover:opacity-100 hover:scale-105 cursor-pointer relative max-h-[40px] flex flex-col justify-between rounded-lg`}>
														<Image src={"/sacura.png"} width={500} height={500} alt="dragonBg" className="absolute right-[-10px] bottom-[-60px] opacity-45 z-0"/>
														<h1 className="text-[#b82761] text-sm text-center z-50" style={{fontFamily: "Belepotan"}}>
															КОРЕЙСКИЙ
														</h1>
														<p>
															{language.level}
														</p>
												</div>
													: ""}
						</div>
					)
				}
		</div>
	)
}

export default Languages