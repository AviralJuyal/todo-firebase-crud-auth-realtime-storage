import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import { getMessaging, getToken, onMessage} from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyA6cQ8THvmDkPvtmjdxIV-KwcN0j3qCDwU",
  authDomain: "fb-crud-2069a.firebaseapp.com",
  projectId: "fb-crud-2069a",
  storageBucket: "fb-crud-2069a.appspot.com",
  messagingSenderId: "302488994606",
  appId: "1:302488994606:web:4177f1fc0316b68f37f0bf"
};

// initializeApp(firebaseConfig);

// const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase

// const auth = getAuth(app);
export const app = initializeApp(firebaseConfig) , db = getDatabase(app) , auth = getAuth(app) ;



const messaging = getMessaging();
//....
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: 'BP5sZf7hFmFu2RWMHHAtdNebyqnzCL72lBHBvsXCrF8PLQZTuYKWks-FTm-KJWlF8tT6W9yjayS5SZ5-PYqsNMw' })
    .then((currentToken) => {
      if (currentToken) {
        // console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        // console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      // console.log('An error occurred while retrieving token. ', err);
    });
};
