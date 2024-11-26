import io from "socket.io-client"

const socketUrl = "http://localhost:4000"

function initializeSocket(currUserId:string){

	const options = {
		reconnectionAttempts: Infinity,
		reconnection: true,
		recconectionDelay: 1000,
		reconnectionDelayMax: 5000,
		query: {userId: currUserId},
	}

	const socket = io(socketUrl)
	return socket
}

export default initializeSocket