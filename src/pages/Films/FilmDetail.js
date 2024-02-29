import React from "react";
import {
    Link,
} from "react-router-dom";

export default function FilmDetail() {

    return (
        <div className="film-detail--container">
            <Link
                to={`..`}
                relative="path"
            >
                &larr; Back to films
            </Link>

            <h1>film detail will go here :)</h1>
        </div>
    )
}