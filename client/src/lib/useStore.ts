import { create } from "zustand";
import { DirectMessage, User } from "@prisma/client";

interface MessageStoreState {
    messages: DirectMessage[];
    setMessages: (message: DirectMessage[]) => void;
    addMessage: (message: DirectMessage) => void;
}

interface CallData {
    roomId: string;
		from: {
			id:string,
			name: string,
			profilePic: string,
		}
}

interface CallStoreState {
    active: boolean;
    callData?: CallData;
    setActive: (isActive: boolean) => void;
    setCallData: (data: CallData | undefined) => void;
}

// Хранилище для сообщений
export const useMessageStore = create<MessageStoreState>((set) => ({
    messages: [],
    addMessage: (message: DirectMessage) => set((state) => ({ messages: [...state.messages, message] })),
    setMessages: (messages: DirectMessage[]) => set({ messages }),
}));

// Хранилище для вызова
export const callStore = create<CallStoreState>((set) => ({
    active: false,
    callData: undefined,
    setActive: (isActive) => set({ active: isActive }),
    setCallData: (callData) => set({ callData }),
}));
