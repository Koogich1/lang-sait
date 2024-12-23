import express, {Express} from "express"
import {createServer, Server as HTTPServer} from "http"
import dotenv from "dotenv"
import cors from "cors"
import {Server as SocketIoServer, Socket} from "socket.io"
import prisma from "./prismadb"
import crypto from "crypto"
import { error } from "console"
import saveMessage from "./actions/saveMessage"

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 8000

const httpServer: HTTPServer = createServer(app)

httpServer.listen(port, () => {
	console.log(`[Server]: Server is running at http://localhost${port}`)
})

const io : SocketIoServer = new SocketIoServer(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
})

io.on("connection", (socket: Socket) => {

    const users = {}

    const emit = (userId, event, data) => {
        // определяем получателя
        const receiver = users[userId]
        if (receiver) {
          // вызываем событие
          receiver.emit(event, data)
        }
    }

	socket
        .on("init", (userId) => {
            userId = socket
            console.log("connected")
        })
        .on('request', (data, userId) => {
            emit(data.to, 'request', { from: userId })
          })
          .on('call', (data, userId) => {
            emit(data.to, 'call', { ...data, from: userId })
          })
          .on('end', (data, userId) => {
            emit(data.to, 'end', userId)
          })
          .on('disconnect', (userId) => {
            delete users[userId]
            console.log(userId, 'disconnected')
          })
	
	

	socket.on("sendMessage", async (message) => {
    const { senderId, receivedId, content } = message;

    if (!senderId || !receivedId) {
        socket.emit("error", "Sender ID or Receiver ID is missing");
        return;
    }

    try {
        const savedMessage = await saveMessage(senderId, receivedId, content); // Ensure this returns the saved message
        const combinedData = [senderId, receivedId].sort().join("");
        const hash = crypto.createHash("sha256").update(combinedData).digest("hex");
        const uniqueKey = `chat:${hash}:message:update`;
        io.emit(uniqueKey, savedMessage); // Emit the saved message directly
    } catch (error) {
        console.error("Failed to send message:", error);
        socket.emit("error", "Message failed to send");
    }
	});
})