// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCVtqaCQGgkyGQQooA_UPW1ZZ74-Ay8PCk",
    authDomain: "attendancemanagement-f2667.firebaseapp.com",
    projectId: "attendancemanagement-f2667",
    storageBucket: "attendancemanagement-f2667.appspot.com",
    messagingSenderId: "224730300117",
    appId: "1:224730300117:web:aefdc18323092ed1daec5c",
    measurementId: "G-C91BEB539X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()