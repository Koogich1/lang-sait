import { Server } from 'socket.io';

export const GET = (req: any, res: any) => {
  // Проверяем, был ли уже создан экземпляр Socket.IO
  if (res.socket.server.io) {
    console.log('Socket is already attached');
    return res.end();
  }

  // Создаем новый сервер Socket.IO
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  // Обработка события подключения
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`User Disconnected: ${socket.id}`);
    });
  });

  res.end();
};
