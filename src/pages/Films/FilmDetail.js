import React from "react";
import {
    Link,
    useLocation,
    useLoaderData,
    defer,
    Await,
} from "react-router-dom";

import "./FilmDetail.css";
import { getFilmById } from "../../api";

export function loader({ params }) {
    
    const filmId = params.id;
    
    return defer({ film: getFilmById(filmId)})
}

export default function FilmDetail() {

    const dataPromise = useLoaderData()
    const location = useLocation();
    const search = location.state?.search || "";

    function renderFilmDetail(film) {
        return (
            <>
                <Link
                    to={`..${search}`}
                    relative="path"
                    >
                    &larr; Back to films
                </Link>
                <div className="detail--container">
                    <img src={film.Poster} alt="Film poster" className="detail--poster"></img>
                    <div className="detail--info">
                        <h1>{film.Title}</h1>
                        <h2>
                            {film.Year + " | "}
                            {film.Type === "series" ?
                            film.totalSeasons + " season" + (film.totalSeasons>1 ? "s" : "") + " | "
                            : ""}
                            {film.Runtime}
                        </h2>
                        <h2>Genre: <span style={{fontWeight: 'normal'}}>{film.Genre}</span></h2>
                        <h2>Director: <span style={{fontWeight: 'normal'}}>{film.Director}</span></h2>
                        <h2>Writer: <span style={{fontWeight: 'normal'}}>{film.Writer}</span></h2>
                        <h2>Actors: <span style={{fontWeight: 'normal'}}>{film.Actors}</span></h2>
                        <h2>IMDb: <span style={{fontWeight: 'normal'}}>{film.imdbRating}</span></h2>
                        <p>{film.Plot}</p>
                    </div>
                </div>
                {/* <p>{JSON.stringify(film)}</p> */}
            </>
        )
    }

    return (
        <React.Suspense fallback={<h3>Loading details...</h3>}>
            <Await resolve={dataPromise.film}>
                {renderFilmDetail}
            </Await>
        </React.Suspense>
    )

    
}