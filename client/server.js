import express from 'express';
import next from 'next';
import { createServer } from 'http';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const httpServer = createServer(server);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    
    // другие обработчики событий сокетов
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(1299, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
