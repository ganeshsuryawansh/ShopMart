import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB6yuDLu6whvisFQLxqJrlau159jrGR_EQ",
  authDomain: "ecom-baf27.firebaseapp.com",
  projectId: "ecom-baf27",
  storageBucket: "ecom-baf27.appspot.com",
  messagingSenderId: "340020112731",
  appId: "1:340020112731:web:340565cba695bb9f6f7e7e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore(app);

export {app, auth, db};