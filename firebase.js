// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
//import AsyncStorage from '@react-native-async-storage/async-storage'
//import { initalizeAuth, getReactNativePersistence } from 'firebase/auth/react-native'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "process.env.EXPO_PUBLIC_API_KEY",
  authDomain: "process.env.EXPO_PUBLIC_AUTH_DOMAIN",
  projectId: "process.env.EXPO_PUBLIC_PROJECT_ID",
  storageBucket: "process.env.EXPO_PUBLIC_STORAGE_BUCKET",
  messagingSenderId: "process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID",
  appId: "process.env.EXPO_PUBLIC_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

/* const auth =  initalizeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
}); */


