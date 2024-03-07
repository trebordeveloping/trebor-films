import React from "react";
import {
    useLoaderData,
    defer,
    Await
} from "react-router-dom"

import "./Favourites.css";
import { getFavourites } from "../../api";
import FilmCard from "../../components/FilmCard";

export async function loader({ request }) {
    return defer({favourites: getFavourites()})
}

export default function Favourites() {

    const dataPromise = useLoaderData();

    function renderFavouriteElements(favourites) {

        const favouriteElements = favourites.map(favourite => (
            <FilmCard key={favourite.imdbID} data={favourite} />
        ))

        return (
            <div className="favourites--container">
                {favouriteElements}
            </div>
        )
    }

    return (
        <>
            <h1>Favourites</h1>
            <React.Suspense fallback={<h3>Loading ...</h3>}>
                <Await resolve={dataPromise.favourites}>
                    {renderFavouriteElements}
                </Await>
            </React.Suspense>
        </>
    )
}