import { useEffect, useRef } from "react";
import { io, Socket } from 'socket.io-client';

const useSocket = () => {
  const socketRef = useRef<Socket | null>(null); // Указываем тип для socketRef
  const socketCreated = useRef(false);

  
};

export default useSocket;
