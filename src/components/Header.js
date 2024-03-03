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
                {true ? 
                    <NavLink
                        to="login"
                        style={({isActive}) => isActive ? activeStyle : null}
                    >
                        Login
                    </NavLink>
                    : <h2>Logout</h2>
                }
            </nav>
        </header>
    )
}