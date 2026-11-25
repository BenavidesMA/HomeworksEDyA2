import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD42sgJJEX5_Fw5N-EFagcsF-NnODgBiP4',
  authDomain: 'mini-music-app-df64b.firebaseapp.com',
  projectId: 'mini-music-app-df64b',
  storageBucket: 'mini-music-app-df64b.firebasestorage.app',
  messagingSenderId: '585599276846',
  appId: '1:585599276846:web:2ab9b0ee4ec16b1b560cbf',
  measurementId: 'G-RW52TFY6EY',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { app, auth, db };