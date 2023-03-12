// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAnewzmt5gXyhw0zGb_ReR6t6Cn2eBrzyg",
    authDomain: "buibui-chat-app.firebaseapp.com",
    projectId: "buibui-chat-app",
    storageBucket: "buibui-chat-app.appspot.com",
    messagingSenderId: "424960564662",
    appId: "1:424960564662:web:1d9ea946c6bbe80842b517",
    measurementId: "G-MFD3EDKW95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);