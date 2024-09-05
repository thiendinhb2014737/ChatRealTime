// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: "chatrealtime-e7169.firebaseapp.com",
  databaseURL: "https://chatrealtime-e7169-default-rtdb.firebaseio.com",
  projectId: "chatrealtime-e7169",
  storageBucket: "chatrealtime-e7169.appspot.com",
  messagingSenderId: "837705806101",
  appId: "1:837705806101:web:8335b26ea49bdc3671391c",
  measurementId: "G-PC2ZLGRJ79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// connectAuthEmulator(auth, "http://127.0.0.1:9099");
// connectFirestoreEmulator(db, "127.0.0.1", 8080);

export { analytics, app, auth, db };
export default initializeApp;
