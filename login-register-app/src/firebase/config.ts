import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDpLDkGrkugy57ucC1ooeg_cj1nzn2UGL4',
  authDomain: 'pruebafirebase-86dfd.firebaseapp.com',
  projectId: 'pruebafirebase-86dfd',
  storageBucket: 'pruebafirebase-86dfd.firebasestorage.app',
  messagingSenderId: '183012002344',
  appId: '1:183012002344:web:cdaef63a0f2e454201031d',
  measurementId: 'G-VKV6ZCBSWG',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { app, auth, db };