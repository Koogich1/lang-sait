"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@prisma/client"
import { useState } from "react";

type Props = {
	user: User;
}

const Subscriptions = ({user}: Props) => {
	const [teachers, setTeachers] = useState<[] | null>(null)
	
	const fetchTeachers = () => {

	}

	return (
		<div className="text-base font-medium">
			в
		</div>
	)
}

export default Subscriptions