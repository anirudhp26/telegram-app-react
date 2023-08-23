import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB3N_5g63cZumCRSvt2OS2oPNI7C0BSpCY",
  authDomain: "phoneauth-e0079.firebaseapp.com",
  projectId: "phoneauth-e0079",
  storageBucket: "phoneauth-e0079.appspot.com",
  messagingSenderId: "516473149346",
  appId: "1:516473149346:web:ca400c8cb9bdb5bbe2c4fb",
  measurementId: "G-KZNMRJCDN9"
};

const fapp = initializeApp(firebaseConfig);
const fauth = getAuth(fapp);

export { fapp, fauth };