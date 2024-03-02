import React from "react";
import {
    Link,
    useLocation,
    useLoaderData,
    defer,
    Await,
} from "react-router-dom";
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
                <div className="film-detail--container">
        
                    <h1>{film.Title}</h1>
                    <p>{JSON.stringify(film)}</p>
                </div>
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