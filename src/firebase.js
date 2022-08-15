import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyA6cQ8THvmDkPvtmjdxIV-KwcN0j3qCDwU",
  authDomain: "fb-crud-2069a.firebaseapp.com",
  projectId: "fb-crud-2069a",
  storageBucket: "fb-crud-2069a.appspot.com",
  messagingSenderId: "302488994606",
  appId: "1:302488994606:web:4177f1fc0316b68f37f0bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
export const db = getDatabase(app) , auth = getAuth(app) ;
