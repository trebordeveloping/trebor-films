
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    collection,
    doc,
    setDoc,
} from "firebase/firestore";

import { db, auth } from "./firebase-config";

const usersCollectionRef = collection(db, "users");

export async function registerUser(creds) {
    const newUserCreds = await createUserWithEmailAndPassword(auth, creds.email, creds.password);

    const newDocRef = doc(db, "users", newUserCreds.user.uid);

    await setDoc(newDocRef, {
        name: creds.name,
    });

    return newUserCreds;

}

export async function loginUser(creds) {
    return await signInWithEmailAndPassword(auth, creds.email, creds.password);
};

export async function logoutUser() {
    await signOut(auth);
    if (window.location.pathname.startsWith("/account")) {
        return window.location.reload();
    }
};