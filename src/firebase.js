// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZV7eKHEbuPiQ5QhGM-PGLAn36c3KgQWU",
  authDomain: "crud-app-cb57e.firebaseapp.com",
  databaseURL: "https://crud-app-cb57e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crud-app-cb57e",
  storageBucket: "crud-app-cb57e.firebasestorage.app",
  messagingSenderId: "104007373790",
  appId: "1:104007373790:web:fb2d41e6df70cbb196c34f",
  measurementId: "G-JTKNEZ3XPF"
};

// Initialize Firebaseqq
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);