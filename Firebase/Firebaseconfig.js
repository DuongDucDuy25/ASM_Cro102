// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBQGnBaHU00EFHi82zZqVEbrrue-GL_VE8",
  authDomain: "slide7-36444.firebaseapp.com",
  databaseURL: "https://slide7-36444-default-rtdb.firebaseio.com",
  projectId: "slide7-36444",
  storageBucket: "slide7-36444.appspot.com",
  messagingSenderId: "388598117299",
  appId: "1:388598117299:web:05f3599a01089ce70411c6",
  measurementId: "G-TCY5X5NNVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
export const firestore = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export { serverTimestamp };
