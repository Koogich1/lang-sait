"use client"

import { useParams } from "next/navigation"
import MainHeader from "../../header"
import { useEffect, useState } from "react"
import { User } from "@prisma/client"
import { currentUser } from "@/lib/auth"
import acceptEmail from "./acceptEmail"
import { ClipLoader } from "react-spinners"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Page = () => {
	const {userId} = useParams()
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const fetchUser = async() => {
			const data = await currentUser()
			if(data){
				setUser(data)
				if(!data.emailVerified){
					acceptEmail()
					fetchUser()
				}
			}
		}
		fetchUser()
	}, [])

	return (
		<>
			<MainHeader />
			<div className="w-full">
				<div className="h-[40vh] flex items-center justify-center w-full pt-[7rem]">
					<div className="lg:w-1/3 md:w-1/2 w-full h-[20vh] rounded-lg shadow-lg flex items-center justify-center bg-white">
						{!user?.emailVerified ? 
						<Button variant={"shadow2"} className="gap-2">
							<p>Ожидайте подтверждения...</p>
							<ClipLoader className="text-xl" color="#9ca3af" size={20}/>
						</Button>
						:
						<div className="flex flex-col items-center justify-center gap-3">
							<h1 className="text-lg font-medium text-[#835BD2]">Email Подтвержден</h1>
							<Link href={"/profile/achievements"}>
								<Button variant={"violetSelect"} className="">
									<p>Перейти в профиль</p>
								</Button>
							</Link>
						</div>
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default Page