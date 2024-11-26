"use client"

import { DirectMessage, User } from "@prisma/client"
import { useEffect, useState, useRef } from "react"
import getDirectMessages from "../actions/getDirectMessages"
import { getUserById } from "@/data/user"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FaArrowUp, FaArrowDown } from "react-icons/fa6"
import initializeSocket from "@/lib/socket"
import { useMessageStore } from "@/lib/useStore"

type Props = {
	friendId: string
	currUser: User;
	uniqueKey: string;
}

const ChatComponent = ({ friendId, currUser, uniqueKey }: Props) => {
	const [input, setInput] = useState<string>("")
	const [friend, setFriend] = useState<User | null>(null);
	const [showScrollToBottom, setShowScrollToBottom] = useState<boolean>(false);
	const socket = initializeSocket(currUser.id);
	const { messages, setMessages, addMessage } = useMessageStore((state) => ({
		messages: state.messages,
		setMessages: state.setMessages,
		addMessage: state.addMessage
	}));

	const messagesEndRef = useRef<HTMLDivElement | null>(null);
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const fetchMessages = async () => {
			const dbMessages = await getDirectMessages(friendId);
			if (dbMessages) {
				setMessages(dbMessages.response);
			}
			const friendInfo = await getUserById(friendId);
			if (friendInfo) {
				setFriend(friendInfo);
			}
		};
		fetchMessages();
	}, [friendId, setMessages]);

	useEffect(() => {
		socket.on(uniqueKey, (newMessage: DirectMessage) => {
			addMessage(newMessage);
			setShowScrollToBottom(true); // Показываем кнопку при новом сообщении
		});
		return () => {
			socket.off(uniqueKey);
		};
	}, [currUser.id, friendId, socket, addMessage, uniqueKey]);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	const SendMessage = () => {
		if (input.trim()) {
			const messageData = {
				senderId: currUser.id,
				receivedId: friendId,
				content: input,
				id: Date.now(),
				createdAt: new Date(),
			};
			socket.emit("sendMessage", messageData);
			setInput("");
		}
	};

	const formatTime = (date: string | Date) => {
		return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	const handleScroll = () => {
		if (messagesContainerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
			if (scrollHeight - scrollTop > clientHeight + 10) {
				setShowScrollToBottom(true);
			} else {
				setShowScrollToBottom(false);
			}
		}
	};

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
		setShowScrollToBottom(false); 
	};

	return (
		<div className="overflow-x-hidden w-full h-full pr-6">
			<div
				ref={messagesContainerRef}
				className="min-h-[83vh] max-h-[83vh] mb-[8vh] overflow-y-scroll w-full m-3 border-[1px] border-gray-100 rounded-lg p-3"
				onScroll={handleScroll}
			>
				{messages?.map((msg, index) => (
					<div
						key={msg.id}
						className={`text-sm relative p-3 rounded-lg max-w-[40%] px-3 py-2 my-3 ${msg.senderId === currUser.id ? "ml-auto bg-blue-300 text-white text-end" : "text-start mr-auto ml-0 bg-gray-200"}`}
					>
						<span>
							<div className={`absolute top-0 text-xs m-[5px] mt-[3px] font-medium ${msg.senderId === currUser.id ? "left-0 text-blue-100" : "right-0 text-gray-400"}`}>
								{formatTime(msg.createdAt)} 
							</div>
							{msg.content}
						</span>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>
			{showScrollToBottom && (
				<Button
					className="absolute bottom-[5.8rem] w-10 left-5 bg-blue-500 text-white rounded-full p-2"
					onClick={scrollToBottom}
				>
					<FaArrowDown />
				</Button>
			)}
			<div className="absolute bottom-5 left-4 right-4 flex items-center justify-between space-x-4">
				<Textarea 
					value={input} 
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" ? SendMessage() : null}
					placeholder="Введите сообщение"
					className="min-h-6"
				/>
				<Button 
					variant={"violetSelect"} 
					onClick={() => SendMessage()} 
					className="px-0 py-0 h-[58px] w-[70px] text-2xl"
				>
					<FaArrowUp />
				</Button>
			</div>
		</div>
	);
};

export default ChatComponent;