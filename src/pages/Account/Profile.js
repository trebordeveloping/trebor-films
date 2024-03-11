import React from "react";

import avatar from "../../images/avatar.png";
import "./Profile.css";
import { useAuth } from "../../contexts/AuthContext";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
    await requireAuth(request);
    return null
}

export default function Profile() {

    const { currentUser, isUserLoggedIn } = useAuth();

    return (
        <div className="profile--page">
            {currentUser.photoURL ?
            <img src={currentUser.photoURL} className="profile--picture" alt="Profile avatar"></img> :
            <img src={avatar} className="profile--picture" alt="Profile avatar"></img>
            }
            <section className="profile--info">
                <h1>Welcome, {currentUser.displayName ? currentUser.displayName : "User"}</h1>
                <p><strong>Email: </strong>{currentUser.email}</p>
                <p><strong>User ID: </strong>{currentUser.uid}</p>
                <br />
                <pre style={{fontSize: "0.5rem", textWrap: 'wrap'}}>{JSON.stringify(currentUser)}</pre>
                <br />
                <p style={{color: 'red'}}>{isUserLoggedIn ? "Logged in" : "Not logged in"}</p>
            </section>
        </div>
    )
}