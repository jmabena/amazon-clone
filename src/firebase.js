import {initializeApp} from "firebase/app";
import {getFirestore,collection,query, where,getDocs} from "firebase/firestore";
import {getAuth,onAuthStateChanged} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBm64sOetOKFSOihKvVij8KSRuvYPh8zps",
  authDomain: "challenge-5f236.firebaseapp.com",
  projectId: "challenge-5f236",
  storageBucket: "challenge-5f236.appspot.com",
  messagingSenderId: "110131693175",
  appId: "1:110131693175:web:c35200c800fb3f8a1a6872",
  measurementId: "G-LNYLSW0Y69",
};

//const firebaseApp = firebase.initialize(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
//const db = firebaseApp.firestore();
//const auth = firebaseApp.auth();
export { db, auth };
