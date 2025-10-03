import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB4xibzMe7lVp0Dm0FCxg_6nsbnsT6x32Q",
  authDomain: "firecrud-dec42.firebaseapp.com",
  databaseURL: "https://firecrud-dec42-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "firecrud-dec42",
  storageBucket: "firecrud-dec42.firebasestorage.app",
  messagingSenderId: "210515142195",
  appId: "1:210515142195:web:244211953f95b235c0a546",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
