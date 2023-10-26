import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
//email
import {getAuth} from 'firebase/auth';
//image
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDsEElrCQw4j2YoYO9rE1VSyafwZ4KbHmM",
  authDomain: "finalproject-4d60a.firebaseapp.com",
  projectId: "finalproject-4d60a",
  storageBucket: "finalproject-4d60a.appspot.com",
  messagingSenderId: "169688289202",
  appId: "1:169688289202:web:d1402de3a8e8a2d9c55eab",
  measurementId: "G-9E5Z8LYSB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
//email
const auth = getAuth(app);
//image
const storage = getStorage(app)

export {fireDB, auth, storage}