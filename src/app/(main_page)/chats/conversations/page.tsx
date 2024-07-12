"use client"

import clsx from "clsx"

import useConversation from "@/actions/useConversation"
import EmptyState from "../components/emptyState"

const Home = () => {
	const {isOpen} = useConversation()

	return(
		<div className={clsx(
			"w-full h-full"
		)}>
			<EmptyState />
		</div>
	)
}

export default Home;