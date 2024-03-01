import React from "react";

export default function(props) {

    return (
        <div>
            <h4>{props.data.film.Title}</h4>
            <h5>{props.data.date}</h5>
            <p>{props.data.description}</p>
        </div>
    )
}