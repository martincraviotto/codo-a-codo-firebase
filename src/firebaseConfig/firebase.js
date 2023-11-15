// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRwmFa0HUdiI86Vt5qQTPXwacv5wszXK4",
  authDomain: "lista-de-productos-de-concina.firebaseapp.com",
  projectId: "lista-de-productos-de-concina",
  storageBucket: "lista-de-productos-de-concina.appspot.com",
  messagingSenderId: "181055327621",
  appId: "1:181055327621:web:d5ba0df153e26e2db188ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);