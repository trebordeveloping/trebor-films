import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link className="site-logo" to="/">TreborFilms</Link>
            <nav>
                <NavLink to="films">Films</NavLink>
                <NavLink to="about">About</NavLink>
                <NavLink to="account">Account</NavLink>
            </nav>
        </header>
    )
}