import React from "react";

import "./FilmCard.css"

export default function FilmCard(props) {

    return (
        <div className="card--container">
            <img src={props.data.Poster} className="card--poster"></img>
            <p className="card--title">{props.data.Title}</p>
        </div>
    )
}