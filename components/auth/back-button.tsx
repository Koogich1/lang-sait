"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link";


interface BackButtonProps {
	href: string;
	label: string;
}

const BackButton = ({label, href} : BackButtonProps) => {
	return (
		<Link 
				className="bg-[#fff] w-[90%] items-center flex justify-center rounded-b-lg"
				href={href}>
			<Button
				className="p-5 h-10 bg-transparent text-[#3e236c] hover:text-[#291747] hover:bg-transparent mt-2 mb-2">
					{label}
			</Button>
		</Link>
	)
}

export default BackButton