import React from "react";
import {
    useLoaderData,
    defer,
    Await
} from "react-router-dom"

import { getFavourites } from "../../api";
import FilmCard from "../../components/FilmCard";

export function loader() {
    return defer({favourites: getFavourites()})
}

export default function Favourites() {

    const dataPromise = useLoaderData();

    function renderFavouriteElements(favourites) {

        const favouriteElements = favourites.map(favourite => (
            <FilmCard data={favourite} />
        ))

        return (
            <>
                {favouriteElements}
            </>
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