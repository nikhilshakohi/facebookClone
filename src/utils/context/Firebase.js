import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//Config Parameters from Firebase App
const firebaseConfig = {
    apiKey: "AIzaSyBtNhjPvLIYsYm9WU7ox6XRWDcK1IVnzcw",
    authDomain: "facebook-clone-96246.firebaseapp.com",
    projectId: "facebook-clone-96246",
    storageBucket: "facebook-clone-96246.appspot.com",
    messagingSenderId: "628460809411",
    appId: "1:628460809411:web:8213b04d96e6e9ce1d8676",
    measurementId: "G-WNBL1CHEC4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
