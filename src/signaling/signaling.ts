import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { pc } from "../webRTC/webRtc";

// Tạo offer
async function createOffer() {
  // Reference Firestore collections for signaling
  const callDocRef = doc(collection(db, "calls"));
  const offerCandidates = collection(callDocRef, "offerCandidates");
  const answerCandidates = collection(callDocRef, "answerCandidates");

  // Get candidates for caller, save to db
  pc.onicecandidate = (event) => {
    event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
  };

  // Create and set local offer description
  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  // Save offer to Firestore
  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };
  await setDoc(callDocRef, { offer });

  // Listen for remote answer
  onSnapshot(callDocRef, (snapshot) => {
    const data = snapshot.data();
    if (data?.answer && !pc.currentRemoteDescription) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });

  // Listen for remote ICE candidates
  onSnapshot(answerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });

  return callDocRef.id;
}

async function answerCall(callId: any) {
  const callDocRef = doc(db, "calls", callId);
  const answerCandidates = collection(callDocRef, "answerCandidates");
  const offerCandidates = collection(callDocRef, "offerCandidates");

  pc.onicecandidate = (event) => {
    event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
  };
  // Fetch the offer from Firestore
  const callDoc = await getDoc(callDocRef);
  const callData: any = callDoc.data();
  const offerDescription = callData.offer;

  // Set remote description with offer
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  // Create and set local answer description
  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  // Save answer to Firestore
  await updateDoc(callDocRef, { answer });

  // Listen for offer ICE candidates
  onSnapshot(offerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });
}

export { answerCall, createOffer };
