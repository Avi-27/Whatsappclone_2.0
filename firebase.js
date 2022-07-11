import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5oe2peOz9ZGDBQF8gfUPveB7i-ueJ-_Q",
  authDomain: "whatsapp2-d7f92.firebaseapp.com",
  projectId: "whatsapp2-d7f92",
  storageBucket: "whatsapp2-d7f92.appspot.com",
  messagingSenderId: "406240738021",
  appId: "1:406240738021:web:b77d6238f2312ee5e5720c",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
