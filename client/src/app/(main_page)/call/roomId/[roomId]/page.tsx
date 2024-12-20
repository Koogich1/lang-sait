"use client";

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'next/navigation';
import initializeSocket from '@/lib/socket';
import { User } from '@prisma/client';
import { currentUser } from '@/lib/auth';

const Room = () => {
	const { roomId } = useParams();

	const userVideoRef = useRef<HTMLVideoElement>(null);
	const peerVideoRef = useRef<HTMLVideoElement>(null);
	const rtcConnectionRef = useRef<RTCPeerConnection | null>(null);
	const [participants, setParticipants] = useState<string[]>([]);
	const [user, setUser] = useState<User | null>(null)
	const [socket, setSocket] = useState<Socket | null>(null)
	const userStreamRef = useRef<MediaStream | null>(null);
	const hostRef = useRef(false);


	useEffect(() => {
		console.log("начинаю")
		const userDate = async() => {
			const data = await currentUser()
			if(data){
				
				console.log("продолжаю 1")
				const dataSocket = initializeSocket(data.id)
				if(dataSocket){
					setSocket(dataSocket)
				}
				console.log("продолжаю 2")
				dataSocket.on('connect', () => {
					console.log('Socket connected:', dataSocket?.id);
					if(dataSocket){
						dataSocket.emit('join', roomId, data.name); // Отправляем join сразу после подключения
					}
				});
				
				dataSocket.on('participants', (updatedList: string[]) => {
					setParticipants(updatedList);
				});

				dataSocket.on('created', handleRoomCreated);
				dataSocket.on('joined', handleRoomJoined);
				dataSocket.on('ready', initiateCall);
				dataSocket.on('leave', onPeerLeave);
				dataSocket.on('full', () => {
					window.location.href = '/';
				});
				dataSocket.on('offer', handleReceivedOffer);
				dataSocket.on('answer', handleAnswer);
				dataSocket.on('ice-candidate', handlerNewIceCandidateMsg);

				return () => {
					dataSocket?.disconnect();
				};
			}
		}
	userDate()
	}, [roomId]);

	const handleRoomCreated = () => {
		hostRef.current = true;
		console.log("я тут")
		navigator.mediaDevices
			.getUserMedia({
				audio: true,
				video: { width: 500, height: 500 },
			})
			.then((stream) => {
				userStreamRef.current = stream;
				if (userVideoRef.current) {
					userVideoRef.current.srcObject = stream;
					userVideoRef.current.onloadedmetadata = () => {
						userVideoRef.current!.play().catch(err => console.error(err, "Error playing video"))
					};
					console.log("User video stream started.");
				}
			})
			.catch((err) => {
				console.error('Error accessing media devices.', err);
			});
	};

	const handleRoomJoined = () => {
		console.log("Присоединяюсь")
		navigator.mediaDevices
			.getUserMedia({
				audio: true,
				video: { width: 500, height: 500 },
			})
			.then((stream) => {
				userStreamRef.current = stream;
				if (userVideoRef.current) {
					userVideoRef.current.srcObject = stream;
					userVideoRef.current.onloadedmetadata = () => {
						userVideoRef.current!.play();
					};
					if(socket){
						socket.emit('ready', roomId);
					}
					console.log("User joined the room and video stream started.");
				}
			})
			.catch((err) => {
				console.error('Error accessing media devices on join.', err);
			});
	};

	const initiateCall = () => {
		console.log("Инициирую")
		if (hostRef.current && userStreamRef.current) {
			rtcConnectionRef.current = createPeerConnection();
			const tracks = userStreamRef.current.getTracks();
			
			tracks.forEach((track) => {
					rtcConnectionRef.current?.addTrack(track, userStreamRef.current!);
			});

			rtcConnectionRef.current
					.createOffer()
					.then((offer) => {
							if (rtcConnectionRef.current) {
									rtcConnectionRef.current.setLocalDescription(offer);
									if (socket) {
											socket.emit('offer', offer, roomId); // Правильная отправка предложения
									}
									console.log("Offer sent to the other peer.");
							}
					})
					.catch((error) => {
							console.error('Error creating offer:', error);
					});
		}
	};

	const ICE_SERVERS = {
		iceServers: [
			{ urls: 'stun:stun.l.google.com:19302' }
		],
	};

	const createPeerConnection = () => {
		console.log("Соединаюсь")
		const connection = new RTCPeerConnection(ICE_SERVERS);
		connection.onicecandidate = handleICECandidateEvent;
		connection.ontrack = handleTrackEvent;
		return connection;
	};

	const onPeerLeave = () => {
		console.log("Ухожу")
		hostRef.current = true;
		if (peerVideoRef.current) {
			const stream = peerVideoRef.current.srcObject;
			if (stream instanceof MediaStream) {
				stream.getTracks().forEach(track => track.stop());
			}
		}

		if (rtcConnectionRef.current) {
			rtcConnectionRef.current.ontrack = null;
			rtcConnectionRef.current.onicecandidate = null;
			rtcConnectionRef.current.close();
			rtcConnectionRef.current = null;
		}
	};

	const handleReceivedOffer = (offer: RTCSessionDescriptionInit) => {
    console.log("Received offer:", offer);
    if (!hostRef.current) {
        rtcConnectionRef.current = createPeerConnection();


        if (userStreamRef.current) {
            userStreamRef.current.getTracks().forEach(track => rtcConnectionRef.current?.addTrack(track, userStreamRef.current!));
        }


        rtcConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer))
            .then(() => {
                console.log("Remote description set successfully.");
								if(!rtcConnectionRef.current){
									console.log("нет соединения")
									return
								}
                return rtcConnectionRef.current.createAnswer();
            })
            .then(answer => {
							if(!rtcConnectionRef.current){
								console.log("нет соединения")
								return
							}
                return rtcConnectionRef.current.setLocalDescription(answer);
            })
            .then(() => {
							if(!rtcConnectionRef.current){
								console.log("нет соединения")
								return
							}
                console.log("Answer sent:", rtcConnectionRef.current.localDescription);
                socket?.emit('answer', rtcConnectionRef.current.localDescription, roomId);
            })
            .catch(error => {
                console.error("Error handling offer:", error);
            });
    }
	};


	const handleAnswer = (answer: RTCSessionDescriptionInit) => {
		rtcConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(answer))
			.catch((err) => console.error('Error setting remote description:', err));
	};

	const handlerNewIceCandidateMsg = (candidate: RTCIceCandidateInit) => {
		if (rtcConnectionRef.current) {
			rtcConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate))
				.catch((error) => {
					console.error('Error adding received ICE candidate:', error);
				});
		}
	};

	const handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
		console.log('кандидат')
		if (event.candidate) {
			if(socket){
				socket.emit('ice-candidate', event.candidate, roomId);
			}
		}
	};

	const handleTrackEvent = (event: RTCTrackEvent) => {
		console.log('Peer video stream started')
		if (peerVideoRef.current) {
			peerVideoRef.current.srcObject = event.streams[0];
			console.log("Peer video stream started.");
		} else {
			console.error('Peer video ref is null');
		}
	};

	const leaveRoom = () => {
		if(socket){
			socket.emit('leave', roomId);
		}

		if (userVideoRef.current && userVideoRef.current.srcObject instanceof MediaStream) {
			(userVideoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
		}
		if (peerVideoRef.current && peerVideoRef.current.srcObject instanceof MediaStream) {
			(peerVideoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
		}

		if (rtcConnectionRef.current) {
			rtcConnectionRef.current.ontrack = null;
			rtcConnectionRef.current.onicecandidate = null;
			rtcConnectionRef.current.close();
			rtcConnectionRef.current = null;
		}
	};

	return (
		<div className='z-[100] flex gap-2 mt-10 pb-20'>
			<div>
				<h2>Participants:</h2>
				<ul>
					{participants && participants.length > 0 ?
						participants.map((participant, index) => (
							<li key={index}>{participant}</li>
						))
						:
						"Нету"
					}
				</ul>
			</div>
			<video autoPlay ref={userVideoRef} style={{ width: '250px', height: '250px' }} className='bg-white' />
			<video autoPlay ref={peerVideoRef} style={{ width: '250px', height: '250px' }} className='bg-gray-500'/>
			<button onClick={leaveRoom} type="button">
				Leave
			</button>
		</div>
	);
};

export default Room;
