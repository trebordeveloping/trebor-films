import React, { useEffect, useState } from "react";
import {
    Link,
    useLocation,
    useLoaderData,
    defer,
    Await,
    useSearchParams,
} from "react-router-dom";

import "./FilmDetail.css";
import { getFilmById } from "../../api";
import { addFavourite } from "../../firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import heart from "../../images/heartIcon_black_empty.png";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

export function loader({ params }) {
    
    const filmId = params.id;
    
    return defer({ film: getFilmById(filmId)})
}

export default function FilmDetail() {

    const dataPromise = useLoaderData()
    const location = useLocation();
    const search = location.state?.search || "";
    const { isUserLoggedIn, currentUser } = useAuth();
    const [fav, setFav] = useState(false);
    console.log(location)

    useEffect(() => {
        
        const unsub = isUserLoggedIn ?
            onSnapshot(doc(db, `users/${currentUser.uid}/favourites`, window.location.pathname.substring(7)), (doc) => {
                console.log("Current data: ", doc.data());
                if (doc.data()) {
                    setFav(true);
                } else {
                    setFav(false);
                }
            })
            : null;
        
        return () => unsub
    }, [])

    async function handleAddFavourite(film) {
        await addFavourite(film);
    }

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

                        {isUserLoggedIn && (
                            <button
                                className="detail--favourites-button"
                                onClick={() => handleAddFavourite(film)}
                            >
                                <img
                                    src={heart}
                                    className={`detail--favourites-icon${fav ? " selected" : ""}`}
                                ></img>
                            </button>
                        )}
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