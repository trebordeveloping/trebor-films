import React, { useState } from "react";
import {
    useLoaderData,
    defer,
    Await,
    Link,
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

    console.log("new url", (new URL(window.location.href)));
    console.log("pathname:", window.location.pathname);

    function renderFavouriteElements(favourites) {

        if (favourites.length === 0) {
            return <h3>no favourites :(</h3>
        }

        const favouriteElements = favourites.map(favourite => (
            <Link
                key={favourite.imdbID}
                to={favourite.imdbID}
                state={{
                    prevPath: "favourites"
                }}
            >
                <FilmCard key={favourite.imdbID} data={favourite} />
            </Link>
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