import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { answerCall, createOffer } from "../signaling/signaling";
import { getLocalStream, handleRemoteStream } from "../webRTC/webRtc";
const CallVideoPage = () => {
  const [callId, setCallId] = useState("");
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      if (localVideoRef.current && remoteVideoRef.current) {
        getLocalStream().then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        });
        handleRemoteStream(remoteVideoRef);
      }
    }, 100); // Có thể cần điều chỉnh thời gian chờ

    return () => {
      clearTimeout(timeoutId);
      stopWebRTC();
    };
  }, []);

  const stopWebRTC = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }

    if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
      const stream = remoteVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleCreateCall = async () => {
    const id = await createOffer();
    setCallId(id);
  };
  const handleAnswerCall = async () => {
    await answerCall(callId);
  };
  const handleBack = () => {
    stopWebRTC();
    navigate(-1);
  };
  return (
    <div className="w-full h-[560px] flex flex-col space-y-2 m-4">
      <div>
        <button onClick={handleBack} className="rounded border-2 p-2">
          <i className="fa-solid fa-angles-right fa-rotate-180"></i>Back
        </button>
      </div>
      <div className="flex-1 flex space-x-2">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="w-1/2 h-full"
        ></video>

        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-1/2 h-full"
        ></video>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleCreateCall}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Create Call
        </button>
        <input
          type="text"
          value={callId}
          onChange={(e) => setCallId(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleAnswerCall}
          className="p-2 bg-green-500 text-white rounded"
        >
          Answer Call
        </button>
      </div>
    </div>
  );
};

export default CallVideoPage;
