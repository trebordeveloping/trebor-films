
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    collection,
    deleteDoc,
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

import { db, auth } from "./firebase-config";

const usersCollectionRef = collection(db, "users");

export async function registerUser(creds) {
    const newUserCreds = await createUserWithEmailAndPassword(auth, creds.email, creds.password);

    const newDocRef = doc(db, "users", newUserCreds.user.uid);

    await setDoc(newDocRef, {
        name: creds.name,
        createdAt: serverTimestamp(),
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

export async function addFavourite(film) {
    console.log(`adding ${film.Title} to favourites...`)
    const newFavouriteRef = doc(db, `users/${auth.currentUser.uid}/favourites`, film.imdbID);
    await setDoc(newFavouriteRef, {
        ...film,
        addedAt: serverTimestamp(),
    })
    console.log(`added ${film.Title} to favourites!`)
}

export async function removeFavourite(filmId) {
    console.log(`removing film with id: ${filmId}`);
    const favouriteRef = doc(db, `users/${auth.currentUser.uid}/favourites`, filmId);
    await deleteDoc(favouriteRef);
    console.log(`deleted film with id: ${filmId}`);
}