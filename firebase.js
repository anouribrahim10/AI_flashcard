// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBKtVm3VXbOGiPFyh603_t_jUREdDm4bU",
    authDomain: "flashcardsaas-3e417.firebaseapp.com",
    projectId: "flashcardsaas-3e417",
    storageBucket: "flashcardsaas-3e417.appspot.com",
    messagingSenderId: "10104577277",
    appId: "1:10104577277:web:6eb3820fe8c91ecc85f294",
    measurementId: "G-Z7S0KQZFNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);