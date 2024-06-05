// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const database = getDatabase(app);
export { analytics, database };
