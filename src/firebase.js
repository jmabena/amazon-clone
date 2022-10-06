import {initializeApp} from "firebase/app";
import {getFirestore,collection,query, where,getDocs} from "firebase/firestore";
import {getAuth,onAuthStateChanged} from "firebase/auth";
const firebaseConfig = {
  
};

//const firebaseApp = firebase.initialize(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
//const db = firebaseApp.firestore();
//const auth = firebaseApp.auth();
export { db, auth };
