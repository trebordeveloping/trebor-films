import React from "react";
import {
    Link,
    useLoaderData,
    defer,
    Await,
} from "react-router-dom";

import "./Films.css";
import { getFilmData } from "../../data";
import FilmCard from "../../components/FilmCard";

export function loader() {
    return defer({ films: getFilmData() })
}

export default function Films() {

    const dataPromise = useLoaderData();
    
    function renderFilmElements(films) {
        
        const filmElements = films.map(film => (
            <Link
                to={film.Title}
                style={{textDecoration: 'none', color: '#FFFFFF'}}
                >
                <FilmCard data={film} />
            </Link>
        ))

        return (
            <div className="films--container">
                {filmElements}
            </div>
        )
    }

    return (
        <>
            <h1>My films :)</h1>
            <React.Suspense fallback={<h3>Loading films...</h3>}>
                <Await resolve={dataPromise.films}>
                    {renderFilmElements}
                </Await>
            </React.Suspense>
        </>
    )

}