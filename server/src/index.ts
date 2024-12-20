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

	const userId = socket.handshake.query.userId as string;
	socket.join(userId)

	socket.on("join", (roomName, userName) => {
		console.log("[User Name] : " + userName);
		console.log("[Created Room]", roomName);
		const { rooms } = io.sockets.adapter;
		const room = rooms.get(roomName);

		// Инициализация списка участников
		if (!rooms[roomName]) {
			rooms[roomName] = []; // Инициализируем список участников
		}

		if (!rooms[roomName].includes(userName)) {
			rooms[roomName].push(userName);
		}

		console.log("[USERS IN ROOM]: [" + rooms[roomName] + "]");

		if (room === undefined) {
			socket.join(roomName);
			socket.emit("created");
			console.log("[Room Created and User Joined] to: " + roomName);
			socket.to(roomName).emit('participants', rooms[roomName]); // Отправка списка участников новым пользователям
		} else if (room.size === 1) {
			socket.join(roomName);
			socket.emit("joined");
			console.log("[User Joined Room]" + " " + roomName);
			socket.broadcast.to(roomName).emit("ready");
			socket.to(roomName).emit('participants', rooms[roomName]); // Отправляем участникам
		} else {
			socket.emit("full");
			console.log("[Room Full]");
		}
	});

	// Triggered when the person who joined the room is ready to communicate.
	socket.on("ready", (roomName) => {
		console.log("я готов")
		socket.broadcast.to(roomName).emit("ready"); // Informs the other peer in the room.
	});

	// Triggered when server gets an icecandidate from a peer in the room.
	socket.on("ice-candidate", (candidate: RTCIceCandidate, roomName: string) => {
		socket.broadcast.to(roomName).emit("ice-candidate", candidate); // Sends Candidate to the other peer in the room.
	});

	// Triggered when server gets an offer from a peer in the room.
	socket.on("offer", (offer, roomName) => {
    console.log("[Offer received] Room: " + roomName);
    console.log("[Offer content]: ", offer);
    socket.broadcast.to(roomName).emit("offer", offer);
});

	// Triggered when server gets an answer from a peer in the room.
	socket.on("answer", (answer, roomName) => {
		console.log("[User 2 accept Offer] " + roomName)
		console.log("[Offer answer]: ", answer);
		socket.broadcast.to(roomName).emit("answer", answer); // Sends Answer to the other peer in the room.
	});

	socket.on("leave", (roomName) => {
		socket.leave(roomName);
		socket.broadcast.to(roomName).emit("leave");
	});

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