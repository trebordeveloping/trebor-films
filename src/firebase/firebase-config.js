
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO3_mR_JoQEoFkfKtdGdSrt7OWJ0FE1xY",
  authDomain: "trebor-films.firebaseapp.com",
  projectId: "trebor-films",
  storageBucket: "trebor-films.appspot.com",
  messagingSenderId: "914650489024",
  appId: "1:914650489024:web:12d1224b2e44e5ca864d25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);