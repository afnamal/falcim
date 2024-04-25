import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbX3uUtHqsr4QCP_mY45Jm_zBd4QqnTHs",
  authDomain: "chat-api-aa04a.firebaseapp.com",
  projectId: "chat-api-aa04a",
  storageBucket: "chat-api-aa04a.appspot.com",
  messagingSenderId: "133901987530",
  appId: "1:133901987530:web:bc1a79762239dd2ba00e33",
  measurementId: "G-PY5NT3EFDP"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const projectAuth=getAuth()



export { projectFirestore,serverTimestamp ,projectAuth,app };