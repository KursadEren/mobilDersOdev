// firebase.js

// Import required functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaTa-gXEe7VlIH99kFQhAoct1j6SZq47U",
  authDomain: "mobildersapp.firebaseapp.com",
  projectId: "mobildersapp",
  storageBucket: "mobildersapp.firebasestorage.app",
  messagingSenderId: "470541547468",
  appId: "1:470541547468:web:d719c31600bb0911d14f69",
  measurementId: "G-Y41C8DZ6GH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db ,app};
