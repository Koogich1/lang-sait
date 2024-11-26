"use client";

import initializeSocket from "@/lib/socket";
import { callStore } from "@/lib/useStore";
import { Video } from "lucide-react";
import CallComponent from "./callComponent";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import getUserByIdChat from "../actions/getUserById";

type Props = {
	reciverId: string;
	currentUserId: string;
};

const MoreMenu = ({ reciverId, currentUserId }: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchCurrentUser = async () => {
			const data = await getUserByIdChat(reciverId);
			if (data) {
				setUser(data);
			}
		};
		fetchCurrentUser();
	}, [reciverId]);  // Добавлено

	const socket = initializeSocket(currentUserId);
	const { active, setActive, callData, setCallData } = callStore((state) => ({
		active: state.active,
		setActive: state.setActive,
		callData: state.callData,
		setCallData: state.setCallData,
	}));

	useEffect(() => {
		socket.on("incomingCall", (data) => {
			console.log("Incoming call data:", data);
			setCallData({
				from: data.from,
				roomId: data.roomId,
			});
			setOpen(true);
		});

		return () => {
			socket.off("incomingCall");
		};
	}, [socket, setCallData]);  // Добавлено

	if (!user) {
		return (
			<div>
				Не вышло
			</div>
		);
	}

	const initializeCall = () => {
		const roomId = Date.now().toString();
		setOpen(true);
		setCallData({
			from: {
				id: currentUserId,
				name: user?.name ?? "",
				profilePic: user.image ?? "",
			},
			roomId,
		});
		socket.emit("initialiseCall", {
			from: {
				id: currentUserId,
				name: user?.name ?? "",
				profilePic: user.image ?? "",
			},
			roomId,
		}, reciverId);
	};

	return (
		<div className="flex items-center justify-end pr-10">
			<Video strokeWidth={2} onClick={initializeCall} />
			<CallComponent open={open} setOpen={setOpen} />
		</div>
	);
};

export default MoreMenu;
