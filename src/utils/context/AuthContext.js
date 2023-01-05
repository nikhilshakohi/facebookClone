//Library
import { createContext, useState, useEffect, useContext } from "react";
// Firebase 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import auth from "./Firebase";
import { collection, addDoc, getFirestore } from "firebase/firestore"; //Firestore

//Create an object for creating Context
export const AuthContext = createContext();

//This function will be used to referrence the functions in AuthContext which use UserContext 
export function useAuth() { return useContext(AuthContext); }

//ThemeProvider for Wrapping (alias for context object)
export function MyAuthProvider({ children }){

    const [user, setUser] = useState();

    //Check for user and save it in currentUser
    useEffect(() => {
        const checkAuth = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) setUser(currentUser);
            else setUser(null);
        });
        //console.log("User Changed!", user);
        return checkAuth;
    }, [user]);

    //E-Mail Login Function from Firebase
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //Signup Function from Firebase
    function signup(email, password, firstName, lastName, gender, DOB) {
        var fullname = firstName + " " + lastName;
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => { updateProfile(auth.currentUser, { displayName: fullname, }); })
            .then(addUserInFirestore(email, firstName, lastName, gender, DOB));
    }

    //Add User to Firestore
    async function addUserInFirestore(email, firstName, lastName, gender, DOB) {
        try {
            await addDoc(collection(getFirestore(), "users"), { email: email, firstName: firstName, lastName: lastName, gender: gender, DOB: DOB });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    //Logout Function from Firebase
    function logout() {
        signOut(auth).then(() => {
            console.log('SignOut Successful');
        }).catch((error) => {
            console.log(error);
        });
    }

    //E-Mail Login Function from Firebase
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //Forgot Password Function from Firebase
    function forgotPasswordMail(email) {
        return sendPasswordResetEmail(auth, email);
    }

    //Upload New Post
    async function uploadPost(username, name, caption, privacy, fileURL, uploadTime) {
        console.log("username: ", username, "name: ", name, "caption: ", caption, "privacy: ", privacy, "fileURL: ", fileURL, "uploadTime: ",uploadTime);
        try {
            await addDoc(collection(getFirestore(), "posts"), { username: username, name: name, caption: caption, privacy: privacy, fileURL: fileURL, uploadTime: uploadTime });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const allAuthFunctions = { user, login, signup, logout, uploadPost, forgotPasswordMail };
    
    //This will return the Provider with context object
    return (
        <AuthContext.Provider value={allAuthFunctions}>
            {/*The children are the Components we wrap 
         * inside the MyThemeProvider in App.js*/}
            {children}
        </AuthContext.Provider>
        )
}