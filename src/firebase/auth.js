
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
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

export async function updateUser(data) {
    return await updateProfile(auth.currentUser, data);
}

export async function getFavourites() {
    console.log("Getting favourites");
    const favouritesCol = collection(db, `users/${auth.currentUser.uid}/favourites`);
    const querySnapshot = await getDocs(favouritesCol);
    const favourites = querySnapshot.docs.map(doc => doc.data());
    return favourites;
}

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

export async function getReviews() {
    console.log("Getting reviews");
    const reviewsColRef = collection(db, "users", auth.currentUser.uid, "reviews");
    const querySnapshot = await getDocs(reviewsColRef);
    const reviews = querySnapshot.docs.map(doc => doc.data());
    return reviews;
}

export async function addReview(data) {
    console.log("Logging review:", data);
    const reviewsColRef = collection(db, "users", auth.currentUser.uid, "reviews");
    await addDoc(reviewsColRef, {
        ...data,
        createdAt: serverTimestamp(),
    });
    console.log("Review logged!")
}