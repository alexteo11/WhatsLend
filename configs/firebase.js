import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSEr0D6efAP5W9VmL6-2b8nab0etcksXw",
  authDomain: "compareloan-f6d21.firebaseapp.com",
  projectId: "compareloan-f6d21",
  storageBucket: "compareloan-f6d21.firebasestorage.app",
  messagingSenderId: "794831117342",
  appId: "1:794831117342:web:559da206168d0c43eca20f",
  measurementId: "G-7LCWKL4E1X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
