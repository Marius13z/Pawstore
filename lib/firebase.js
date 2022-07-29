// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB534RZ5r5cg6ffFW6ms_pYFTrcwtJN6qo",
  authDomain: "pawstore-81996.firebaseapp.com",
  projectId: "pawstore-81996",
  storageBucket: "pawstore-81996.appspot.com",
  messagingSenderId: "589771061704",
  appId: "1:589771061704:web:e93ddf48b0bcb4aec2e8fd",
  measurementId: "G-6N8FD2YVMB"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initializare Authentication Service
export const auth = getAuth(app)

// Add Google Authentication
export const googleProvider = new GoogleAuthProvider();

// Add Facebook Authentication
export const facebookProvider = new FacebookAuthProvider();

// Add Github Authentication
export const githubProvider = new GithubAuthProvider();

// Initializare firestore
export const db = getFirestore(app);
