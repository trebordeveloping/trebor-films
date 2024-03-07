import React from "react";

import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase/firebase-config";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
    await requireAuth(request);
    return null
}

export default function Profile() {

    const { currentUser, isUserLoggedIn } = useAuth();

    return (
        <>
            <h1>profile shit goes here</h1>
            <h1 style={{color: 'red'}}>Is logged in: {isUserLoggedIn ? "yes" : "no"}</h1>
            <p><strong>Email: </strong>{currentUser.email}</p>
            <p><strong>User ID: </strong>{currentUser.uid}</p>
            <br />
            <h1>Auth user shit</h1>
            <p>{JSON.stringify(auth.currentUser)}</p>
        </>
    )
}