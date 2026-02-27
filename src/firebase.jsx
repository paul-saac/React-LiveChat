// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);