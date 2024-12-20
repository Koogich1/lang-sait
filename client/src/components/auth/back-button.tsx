"use client"

import { Button } from "../ui/button"
import Link from "next/link";


interface BackButtonProps {
	href: string;
	label: string;
}

const BackButton = ({label, href} : BackButtonProps) => {
	return (
		<Link 
				className="bg-white w-[90%] items-center flex justify-center rounded-b-lg"
				href={href}>
			<Button
				className="px-5 h-8 bg-[#835BD2] text-white hover:bg-[#7650c1] my-2">
					{label}
			</Button>
		</Link>
	)
}

export default BackButton