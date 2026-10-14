import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCTfV6CH_3-SzqupcPAnVLFD3-a2xag430',
  authDomain: 'challenge09-7e86b.firebaseapp.com',
  projectId: 'challenge09-7e86b',
  storageBucket: 'challenge09-7e86b.firebasestorage.app',
  messagingSenderId: '696977720116',
  appId: '1:696977720116:web:2aaaabcf8c977bc85e9b61'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);