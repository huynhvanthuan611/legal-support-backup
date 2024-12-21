// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBf1qGK0enG5m3Dds9w5rw1C6B-KL5oHXk",
  authDomain: "legal-support-544b5.firebaseapp.com",
  databaseURL: "https://legal-support-544b5-default-rtdb.firebaseio.com",
  projectId: "legal-support-544b5",
  storageBucket: "legal-support-544b5.firebasestorage.app",
  messagingSenderId: "909345024495",
  appId: "1:909345024495:web:df140280981ca8be2fee1a",
  measurementId: "G-53NWSHT32T"
};


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
