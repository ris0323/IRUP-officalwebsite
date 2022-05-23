import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDc1zd1ZGdOTBJ5g8MMV-WeASjvzkiaNrM",
  authDomain: "irupremake.firebaseapp.com",
  projectId: "irupremake",
  storageBucket: "irupremake.appspot.com",
  messagingSenderId: "643719127844",
  appId: "1:643719127844:web:33ab6c4fb2a583084c49b1"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
