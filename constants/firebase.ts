import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDLKJX9R75Mpr4A-X5YKJAatz6y2ZjoUCA",
    authDomain: "mudras-e2730.firebaseapp.com",
    projectId: "mudras-e2730",
    storageBucket: "mudras-e2730.firebasestorage.app",
    messagingSenderId: "785282488307",
    appId: "1:785282488307:web:533f61a327914a05e6a486",
    measurementId: "G-6L0WHX0W34"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;