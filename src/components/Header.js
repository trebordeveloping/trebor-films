import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./Header.css";
import { logoutUser } from "../firebase/auth";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
    }

    const { isUserLoggedIn } = useAuth();

    async function handleLogout() {
        try {
            return await logoutUser();
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
                {isUserLoggedIn ?
                <button className="log-out--button" onClick={handleLogout}>Log out</button>
                :
                <NavLink
                    to="login"
                    // style={({isActive}) => isActive ? activeStyle : null}
                    className="log-out--button"
                >
                    Login
                </NavLink>
                }
            </nav>
        </header>
    )
}