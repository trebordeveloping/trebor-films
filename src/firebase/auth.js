
import {
    signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "./firebase-config";

export async function loginUser(creds) {
    return await signInWithEmailAndPassword(auth, email, password);
}