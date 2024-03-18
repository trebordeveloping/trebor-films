import React from "react";

import "./Review.css";

export default function Review(props) {

    const { rating, review, createdAt, film } = props.data;
    const date = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(createdAt.toDate());

    return (
        <div className="review--container">
            <img className="review--poster" src={film.Poster} alt="Film poster"></img>
            <section className="review--info">
                <h1 className="review--film-title">{film.Title}</h1>
                <div>
                    <h2 className="review--date">{date}</h2>
                    <h2>{rating}/5</h2>
                </div>
                <p className="review--description">{review}</p>
            </section>
        </div>
    )
}