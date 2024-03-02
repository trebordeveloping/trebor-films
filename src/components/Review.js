import React from "react";

import "./Review.css";

export default function Review(props) {

    return (
        <div className="review--container">
            <img className="review--poster" src={props.data.film.Poster}></img>
            <section className="review--info">
                <h1 className="review--film-title">{props.data.film.Title}</h1>
                <div>
                    <h2 className="review--date">{props.data.date}</h2>
                    <h2>{props.data.rating}/5</h2>
                </div>
                <p className="review--description">{props.data.description}</p>
            </section>
        </div>
    )
}