import React, { useState } from "react";
import {
    useLoaderData,
    defer,
    Await
} from "react-router-dom"

import "./Favourites.css";
import { getFavourites } from "../../api";
import FilmCard from "../../components/FilmCard";
import { requireAuth } from "../../utils";
import { addFavourite, removeFavourite, getFavourites as getFavs } from "../../firebase/auth";

export async function loader({ request }) {
    await requireAuth(request);
    return defer({favourites: getFavs()})
}

export default function Favourites() {

    const dataPromise = useLoaderData();

    function renderFavouriteElements(favourites) {

        if (favourites.length === 0) {
            return <h3>no favourites :(</h3>
        }

        const favouriteElements = favourites.map(favourite => (
            <div key={favourite.imdbID}>
                <FilmCard key={favourite.imdbID} data={favourite} />
                <button onClick={() => removeFavourite(favourite.imdbID)}>remove from favourites</button>
            </div>
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