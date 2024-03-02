import React from "react";
import { Form } from "react-router-dom";

import "./SearchBar.css";
import searchIcon from "../images/searchIcon_grey.png";

export default function SearchBar() {

    return (
        <Form
                method="post"
                className="search-bar--container"
                replace
            >
                <input
                    name="search"
                    type="text"
                    placeholder="search..."
                    className="search-bar"
                />
                <button
                    className="search-button"
                >
                    <img src={searchIcon} alt="search icon" className="search-icon"></img>
                </button>
            </Form>
    )
}