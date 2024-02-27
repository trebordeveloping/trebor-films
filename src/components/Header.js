import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./Header.css";

export default function Header() {

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
    }
    return (
        <header>
            <Link className="site-logo" to="/">TreborFilms</Link>
            <nav>
                <NavLink
                    to="films"
                    style={({isActive}) => isActive ? activeStyle : null}
                >
                    Films
                </NavLink>
                <NavLink
                    to="about"
                    style={({isActive}) => isActive ? activeStyle : null}
                >
                    About
                </NavLink>
                <NavLink
                    to="account"
                    style={({isActive}) => isActive ? activeStyle : null}
                >
                    Account
                </NavLink>
            </nav>
        </header>
    )
}