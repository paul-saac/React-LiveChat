import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm86lO63Xh7vl5tw2nT1TDq0abjt-wk4M",
  authDomain: "react-livechat-535aa.firebaseapp.com",
  projectId: "react-livechat-535aa",
  storageBucket: "react-livechat-535aa.firebasestorage.app",
  messagingSenderId: "295499051591",
  appId: "1:295499051591:web:44ed18baec791c99957762",
  measurementId: "G-65X9ZY6GTY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
