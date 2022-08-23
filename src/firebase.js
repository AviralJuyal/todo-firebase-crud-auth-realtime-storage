import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import { getMessaging, getToken, onMessage} from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
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
