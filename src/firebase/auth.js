
import {
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { auth } from "./firebase-config";

export async function loginUser(creds) {
    return await signInWithEmailAndPassword(auth, creds.email, creds.password);
};

export async function logoutUser() {
    await signOut(auth);
    return window.location.reload();
};