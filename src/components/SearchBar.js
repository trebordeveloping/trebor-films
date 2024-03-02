import React from "react";
import { Form } from "react-router-dom";

export default function SearchBar() {

    return (
        <Form
                method="post"
                replace
            >
                <input
                    name="search"
                    type="text"
                    placeholder="search..."
                />
                <button>x</button>
            </Form>
    )
}