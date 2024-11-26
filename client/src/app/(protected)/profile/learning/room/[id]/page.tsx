"use client"

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { io } from "socket.io-client";
import useSocket from "../../hooks/useSocket";

const ICE_SERVERS = {
  iceServers: [{ urls: "stun:openrelay.metered.ca:80" }]
};

const Room = () => {
  useSocket();
  const router = useRouter();
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peerVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<any>(null);
  const rtcConnectionRef = useRef<RTCPeerConnection | null>(null);
  const id = useParams()
  const { id: roomName } = id;

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.emit("join", roomName);
    socketRef.current.on("created", handleRoomCreated);
    socketRef.current.on("joined", handleRoomJoined);
    socketRef.current.on("offer", handleReceivedOffer);
    socketRef.current.on("answer", handleAnswer);
    socketRef.current.on("ice-candidate", handlerNewIceCandidateMsg);
    socketRef.current.on("leave", onPeerLeave);

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomName]);

  const onPeerLeave = () => {
    if (peerVideoRef.current) {
      peerVideoRef.current.srcObject = null;
    }
  };

  const handleRoomCreated = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    userVideoRef.current!.srcObject = stream;
    socketRef.current.emit("ready", roomName);
  };

  const handleRoomJoined = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    userVideoRef.current!.srcObject = stream;
    socketRef.current.emit("ready", roomName);
  };

  const handleReceivedOffer = (offer: RTCSessionDescriptionInit) => {
    rtcConnectionRef.current = new RTCPeerConnection(ICE_SERVERS);
    rtcConnectionRef.current.onicecandidate = handleICECandidateEvent;
    rtcConnectionRef.current.ontrack = handleTrackEvent;

    rtcConnectionRef.current.setRemoteDescription(offer);
    
    const stream = userVideoRef.current?.srcObject as MediaStream; // Явное указание типа
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => { // Явное указание типа для track
        rtcConnectionRef.current?.addTrack(track, stream);
      });
    }

    rtcConnectionRef.current.createAnswer().then(answer => {
      rtcConnectionRef.current!.setLocalDescription(answer);
      socketRef.current.emit("answer", answer, roomName);
    });
  };

  const handleAnswer = (answer: RTCSessionDescriptionInit) => {
    rtcConnectionRef.current?.setRemoteDescription(answer);
  };

  const handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      socketRef.current.emit("ice-candidate", event.candidate, roomName);
    }
  };

  const handlerNewIceCandidateMsg = (incoming: RTCIceCandidateInit) => {
    const candidate = new RTCIceCandidate(incoming);
    rtcConnectionRef.current?.addIceCandidate(candidate);
  };

  const handleTrackEvent = (event: RTCTrackEvent) => {
    if (peerVideoRef.current) {
      peerVideoRef.current.srcObject = event.streams[0];
    }
  };

  const leaveRoom = () => {
    socketRef.current.emit("leave", roomName);
    if (rtcConnectionRef.current) {
      rtcConnectionRef.current.close();
      rtcConnectionRef.current = null;
    }
    if (userVideoRef.current?.srcObject) {
      (userVideoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop()); // Явное указание типа
    }
    if (peerVideoRef.current?.srcObject) {
      (peerVideoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop()); // Явное указание типа
    }
    router.push("/");
  };

  return (
    <div>
      <video autoPlay ref={userVideoRef} />
      <video autoPlay ref={peerVideoRef} />
      <button onClick={leaveRoom}>Leave</button>
    </div>
  );
};

export default Room;