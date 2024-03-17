import React, { useState } from "react";


import avatar from "../../images/avatar.png";
import "./Profile.css";
import { useAuth } from "../../contexts/AuthContext";
import { requireAuth } from "../../utils";
import { updateUser } from "../../firebase/auth";
import { auth } from "../../firebase/firebase-config";
import EditProfile from "./EditProfile";

export async function loader({ request }) {
    await requireAuth(request);
    return null
}

export async function action({ request }) {
    const formData = await request.formData();
    const displayName = formData.get("name") || auth.currentUser.displayName;
    const photoURL = formData.get("photoURL") || auth.currentUser.photoURL;

    try {
        await updateUser({
            displayName,
            photoURL,
        })
        window.location.reload();
        return null;
    } catch(err) {
        console.log(err);
        return err.message;
    }
}

export default function Profile() {

    const { currentUser, isUserLoggedIn } = useAuth();

    const [edit, setEdit] = useState(false);

    function startEdit() {
        setEdit(true);
    }
    function cancelEdit(event) {
        event.preventDefault();
        setEdit(false);
        console.log("Cancelled!")
    }

    return (
        <div className="profile--page">
            <div className="profile--container">
                {currentUser.photoURL ?
                <img src={currentUser.photoURL} className="profile--picture" alt="Profile avatar"></img> :
                <img src={avatar} className="profile--picture" alt="Profile avatar"></img>
                }
                <section className="profile--info">
                    <h1>Welcome, {currentUser.displayName ? currentUser.displayName : "User"}</h1>
                    <p><strong>Name: </strong>
                        {currentUser.displayName ? currentUser.displayName : "n/a"}
                    </p>
                    <p><strong>Email: </strong>{currentUser.email}</p>
                    <p><strong>User ID: </strong>{currentUser.uid}</p>
                    <br />
                    {/* <pre style={{fontSize: "0.1rem", textWrap: 'wrap'}}>{JSON.stringify(currentUser)}</pre> */}
                    <br />
                    <p style={{color: 'red'}}>{isUserLoggedIn ? "Logged in" : "Not logged in"}</p>
                    <button
                        onClick={startEdit}
                        disabled={edit}
                    >Edit Profile</button>
                </section>
                {edit && (
                    <EditProfile cancelEdit={cancelEdit} />
                )}
            </div>

        </div>
    )
}