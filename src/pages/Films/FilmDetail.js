import React from "react";
import {
    Link,
    useLocation,
} from "react-router-dom";

export default function FilmDetail() {

    const location = useLocation();
    const search = location.state?.search || "";

    return (
        <div className="film-detail--container">
            <Link
                to={`..${search}`}
                relative="path"
            >
                &larr; Back to films
            </Link>

            <h1>film detail will go here :)</h1>
        </div>
    )
}