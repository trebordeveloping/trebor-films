import React from "react";
import { Link, NavLink, redirect } from "react-router-dom";

import "./Header.css";
import { logoutUser } from "../firebase/auth";

export default function Header() {

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
    }

    async function handleLogout() {
        try {
            await logoutUser();
            return redirect('/');
        } catch(err) {
            console.log(err.message);
        }
    }

    return (
        <header>
            <Link className="site-logo" to="/">Trebor<span style={{color: "#00FF00"}}>Films</span></Link>
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
                <NavLink
                    to="login"
                    style={({isActive}) => isActive ? activeStyle : null}
                >
                    Login
                </NavLink>
                <button className="log-out--button" onClick={handleLogout}>Log out</button>
            </nav>
        </header>
    )
}