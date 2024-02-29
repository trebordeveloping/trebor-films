import React from "react";
import {
    useLoaderData,
} from "react-router-dom";

import { getFilmData } from "../data";

export function loader() {
    return getFilmData()
}

export default function Films() {

    const filmData = useLoaderData();
    console.log(filmData);

    const filmElements = filmData.map(film => (
        <p>{JSON.stringify(film)}</p>
    ))

    return (
        <>
            <h1>Film component</h1>
            {filmElements}
        </>
    )
}