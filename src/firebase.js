import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBxam9sqe6-s4JZL6zLIiDoOwKdJ9Nuzkk",
    authDomain: "uretkenyazilimci.firebaseapp.com",
    projectId: "uretkenyazilimci",
    storageBucket: "uretkenyazilimci.appspot.com",
    messagingSenderId: "207959367687",
    appId: "1:207959367687:web:55d66c5999818d34574aa2"
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;

