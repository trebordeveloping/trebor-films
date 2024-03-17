import React, { useState } from "react";
import {
    Form,
    useNavigation,
} from "react-router-dom";

export default function NewReview(props) {

    const navigation = useNavigation();

    const { imdbID, Title, Poster, Year } = props.film;
    const film = { imdbID, Title, Poster, Year };

    const [review, setReview] = useState({
        rating: 0,
        review: "",
    });

    function handleReviewChange(event) {
        const {name, value} = event.target;
        setReview(prev => ({
            ...prev,
            [name]: name === "rating" ? parseFloat(value) : value,
        }))
    }

    function cancelReview(event) {
        event.preventDefault();
        props.setRev(false);
    }

    return (
        <Form
            method="post"
            className="detail--review--container"
            replace
        >
            <h1>Your review</h1>
            <input
                type="hidden"
                name="film"
                value={JSON.stringify(film)}
            />
            <section className="detail--review--rating">
                <input
                    name="rating"
                    type="range"
                    min={0} max={5} step={0.5}
                    value={review.rating}
                    onChange={handleReviewChange}
                />
                <p>{review.rating}</p>
            </section>
            <textarea
                name="review"
                placeholder="What did you think of the film?"
                className="detail--review--textarea"
                value={review.review}
                onChange={handleReviewChange}
            />
            <section className="detail--review--buttons">
                <button
                    disabled={
                        navigation.state === "submitting"
                    }
                >
                    {navigation.state === "submitting"
                        ? "Saving..."
                        : "Save"
                    }
                </button>
                <button
                    onClick={cancelReview}
                    >
                    Cancel
                </button>
            </section>
        </Form>
    )
}