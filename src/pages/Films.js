import React from "react";
import {
    useLoaderData,
} from "react-router-dom";

import "./Films.css";
import { getFilmData } from "../data";
import FilmCard from "../components/FilmCard";

export function loader() {
    return getFilmData()
}

export default function Films() {

    const filmData = useLoaderData();
    console.log(filmData);

    const filmElements = filmData.map(film => (
        <FilmCard data={film} />
    ))

    return (
        <>
            <div className="films--container">
                {filmElements}
            </div>
        </>
    )
}