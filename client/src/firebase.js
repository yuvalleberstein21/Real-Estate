// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mernestate.firebaseapp.com",
    projectId: "mernestate",
    storageBucket: "mernestate.appspot.com",
    messagingSenderId: "773364122675",
    appId: "1:773364122675:web:f50be0d5cca273273d0f46"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);