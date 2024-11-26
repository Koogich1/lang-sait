import express, {Express} from "express"
import {createServer, Server as HTTPServer} from "http"
import dotenv from "dotenv"
import cors from "cors"
import {Server as SocketIoServer, Socket} from "socket.io"
import prisma from "./prismadb"
import crypto from "crypto"
import { error } from "console"

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 8000

const httpServer: HTTPServer = createServer(app)

const io : SocketIoServer = new SocketIoServer(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
})

io.on("connection", (socket: Socket) => {

	const userId = socket.handshake.query.userId as string;
	socket.join(userId)

	socket.on("initialiseCall", (data, reciverId) => {
		console.log("InitialisiongCall", data)

		io.to(reciverId).emit("incomingCall", {
			from: data.from,
			roomId: data.roomId
		})
	})

	socket.on("sendMessage", async(message: {senderId: string, receivedId: string, content:string, id:number, createdAt: Date}) => {
		const {senderId, receivedId, content, id, createdAt} = message

		if(!senderId || !receivedId){
			throw new Error("Sender ID or ReceiverID is Missing")
		}

		try{
			const savedMessage = await prisma.directMessage.create({
				data:{
					senderId,
					receivedId,
					content,
				}
			})
			const combinedData = [senderId, receivedId].sort().join("")
			
			const hash = crypto.createHash("sha256").update(combinedData).digest("hex")

			const uniqueKey = `chat:${hash}:message:update`
			io.emit(uniqueKey, {...savedMessage})
		}catch(e){			
			console.error("failed to send message:", error)
			socket.emit("error", "Message failed to send")
		}
	})
})

httpServer.listen(port, () => {
	console.log(`[Server]: Server is running at http://localhost${port}`)
})