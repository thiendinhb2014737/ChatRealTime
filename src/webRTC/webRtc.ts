// src/webRTC/webRtc.js

// const servers = {
//   iceServers: [
//     { urls: "stun:stun.l.google.com:19302" },
//     { urls: "stun:stun1.l.google.com:19302" },
//   ],
// };

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

// Thêm local stream vào peer connection
async function getLocalStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    if (stream) {
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
    }
    return stream;
  } catch (error) {
    return null;
  }
}

function handleRemoteStream(remoteVideoRef: any) {
  const remoteStream = new MediaStream();

  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
      // remoteVideoRef.current.play(); // Ensure the video starts playing
    }
  };
}
// Theo dõi trạng thái kết nối ICE
pc.oniceconnectionstatechange = () => {
  // console.log("ICE connection state:", pc.iceConnectionState);
};

// Xử lý ICE candidates
pc.onicecandidate = (event) => {
  if (event.candidate) {
    // console.log("ICE candidate added:", event.candidate);
    // Gửi ICE candidate đến peer đối diện thông qua Firebase hoặc một phương thức tương tự
  } else {
    // console.log("End of ICE candidates.");
  }
};

export { getLocalStream, handleRemoteStream, pc };
