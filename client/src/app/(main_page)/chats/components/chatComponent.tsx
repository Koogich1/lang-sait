"use client";

import { DirectMessage, User } from "@prisma/client";
import { useEffect, useState, useRef } from "react";
import getDirectMessages from "../actions/getDirectMessages";
import { getUserById } from "@/data/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import initializeSocket from "@/lib/socket";
import { useMessageStore } from "@/lib/useStore";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
    friendId: string;
    currUser: User;
    uniqueKey: string;
};

const ChatComponent = ({ friendId, currUser, uniqueKey }: Props) => {
    const [input, setInput] = useState<string>("");
    const [friend, setFriend] = useState<User | null>(null);
    const socket = initializeSocket(currUser.id);

    const messages = useMessageStore(state => state.messages);
    const setMessages = useMessageStore(state => state.setMessages);
    const addMessage = useMessageStore(state => state.addMessage);

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
    }, [friendId, setMessages]); // Dependencies

    useEffect(() => {
        socket.on(uniqueKey, (newMessage: DirectMessage) => {
            if (!newMessage) {
                console.error('Received an undefined message');
                return;
            }
            console.log('New message data:', newMessage);
            addMessage(newMessage);
        });
    
        return () => {
            socket.off(uniqueKey);
        };
    }, [uniqueKey, addMessage]);

    const SendMessage = () => {
        if (input.trim()) {
            const messageData = {
                senderId: currUser.id,
                receivedId: friendId,
                content: input,
                id: Date.now(),
                createdAt: new Date(),
            };
            console.log(messageData)
            socket.emit("sendMessage", messageData);
            setInput("");
        }
    };

    const formatTime = (date: string | Date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="">
            <ScrollArea
                className="w-[97%] m-3 mr-10 border-[1px] border-gray-100 rounded-lg p-3 h-[60vh] mb-[5.5rem]"
            >
                {messages?.map((msg) => (
                    <div
                        key={`${msg.id}-${msg.createdAt}`} // Ensure a unique key here
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
            </ScrollArea>
            
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