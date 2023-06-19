// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATGD-gokzibDaWVlfW1TSim0vzfMurhA0",
  authDomain: "tripnow-9257e.firebaseapp.com",
  projectId: "tripnow-9257e",
  storageBucket: "tripnow-9257e.appspot.com",
  messagingSenderId: "278752891376",
  appId: "1:278752891376:web:67be8b20c4ea8099b34d35",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
