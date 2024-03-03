import React from "react";
import {
    Outlet,
    NavLink,
} from "react-router-dom";

import { requireAuth } from "../../utils";

export async function loader({ request }) {
    await requireAuth(request)
    return null
}

export default function Account() {

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