import React from "react";
import {
    Outlet,
    NavLink,
    Link,
} from "react-router-dom";

import { requireAuth } from "../../utils";
import { useAuth } from "../../contexts/AuthContext";

export async function loader({ request }) {
    await requireAuth(request)
    console.log("not account loader redirect")
    return null
}

export default function Account() {

    const { isUserLoggedIn } = useAuth();
    if (!isUserLoggedIn) {
        return
    }

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#00FF00",
    }

    return (
        <>
            <nav style={{marginBottom: '10px'}}>
                <NavLink
                    to="."
                    end
                    style={({ isActive }) => isActive ? activeStyle : null}
                >
                    Favourites
                </NavLink>

                <NavLink
                    to="reviews"
                    style={({ isActive }) => isActive ? activeStyle : null}
                >
                    Reviews
                </NavLink>

                <NavLink
                    to="profile"
                    style={({ isActive }) => isActive ? activeStyle : null}
                >
                    Profile
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
}