import React, { useState } from "react";
import {
    Form, useNavigation,
} from "react-router-dom";

export default function EditProfile(props) {

    const navigation = useNavigation();

    const [user, setUser] = useState({
        name: "",
        photoURL: "",
    });

    function handleUserChange(event) {
        setUser(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    return (
        <Form
            method="post"
            className="profile--edit"
            replace
        >
            <input
                name="name"
                type="text"
                placeholder="Name..."
                value={user.name}
                onChange={handleUserChange}
            />
            <input
                name="photoURL"
                type="text"
                placeholder="Photo URL..."
                value={user.photoURL}
                onChange={handleUserChange}
            />
            <section className="profile--edit-buttons">
                <button
                    disabled={
                        (navigation.state === "submitting") ||
                        (!user.name && !user.photoURL)
                    }
                    >
                    {navigation.state === "submitting"
                        ? "Saving..."
                        : "Save"
                    }
                </button>
                <button
                    onClick={props.cancelEdit}
                    >
                    Cancel
                </button>
            </section>
        </Form>
    )
}