import React, { useRef, useState } from "react";
import {
    Form,
    redirect,
    useNavigation,
} from "react-router-dom";

import avatar from "../../images/avatar.png";
import "./Profile.css";
import { useAuth } from "../../contexts/AuthContext";
import { requireAuth } from "../../utils";
import { updateUser } from "../../firebase/auth";
import { auth } from "../../firebase/firebase-config";

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
    const navigation = useNavigation();

    function resetEdit() {
        return ({
            edit: false,
            name: "",
            photoURL: "",
        })
    }

    const [editProfile, setEditProfile] = useState(resetEdit());
    function handleChange(event) {
        setEditProfile(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }
    function startEdit() {
        setEditProfile(prev => ({...prev, edit: !prev.edit}));
    }
    function cancelEdit(event) {
        event.preventDefault();
        setEditProfile(prev => (resetEdit()));
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
                        disabled={editProfile.edit}
                    >Edit Profile</button>
                </section>
            </div>

            {editProfile.edit && (
                <Form
                    method="post"
                    className="profile--edit"
                    replace
                >
                    <pre>{JSON.stringify(editProfile)}</pre>
                    <input
                        name="name"
                        type="text"
                        placeholder="Name..."
                        value={editProfile.name}
                        onChange={handleChange}
                    />
                    <input
                        name="photoURL"
                        type="text"
                        placeholder="Photo URL..."
                        value={editProfile.photoURL}
                        onChange={handleChange}
                    />
                    
                    <section>
                        <button
                            disabled={
                                (navigation.state === "submitting") ||
                                (!editProfile.name && !editProfile.photoURL)
                            }
                            >
                            {navigation.state === "submitting"
                                ? "Updating ..."
                                : "Save"
                            }
                        </button>
                        <button
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    </section>
                </Form>
            )}

        </div>
    )
}