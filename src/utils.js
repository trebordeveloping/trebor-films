import { redirect } from "react-router-dom";

import { auth } from "./firebase/firebase-config";

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname

    console.log("second check:", auth.currentUser);
    if (!auth.currentUser) {
        console.log(auth.currentUser)
        console.log("!auth.currentUser: ", !auth.currentUser)
        console.log("reedirecting!")
        throw redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
    }
}