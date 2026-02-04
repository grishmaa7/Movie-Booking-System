// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "movie-booking-system-3c1aa.firebaseapp.com",
    projectId: "movie-booking-system-3c1aa",
    storageBucket: "movie-booking-system-3c1aa.firebasestorage.app",
    messagingSenderId: "959848002473",
    appId: "1:959848002473:web:ab4732d469dac77bda0ab8",
    measurementId: "G-FW0SYGSXRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

