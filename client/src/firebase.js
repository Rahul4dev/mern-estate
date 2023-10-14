// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-rahul4dev.firebaseapp.com',
  projectId: 'mern-estate-rahul4dev',
  storageBucket: 'mern-estate-rahul4dev.appspot.com',
  messagingSenderId: '315052887836',
  appId: '1:315052887836:web:fc352a54b19805032cb4d9',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
