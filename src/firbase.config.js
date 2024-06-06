import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCFJrjjD1yTiIHnWzVc4xIxPBBGnuKmHUw",
  authDomain: "account-management-d48c7.firebaseapp.com",
  projectId: "account-management-d48c7",
  storageBucket: "account-management-d48c7.appspot.com",
  messagingSenderId: "856871377039",
  appId: "1:856871377039:web:fad1572a6d30d935edb8fa",
  measurementId: "G-VH2Y0Z81G2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
