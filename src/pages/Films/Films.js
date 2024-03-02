import React from "react";
import {
    Link,
    useLoaderData,
    defer,
    Await,
    useSearchParams,
} from "react-router-dom";

import "./Films.css";
import { getFilmsBySearch } from "../../api";
import FilmCard from "../../components/FilmCard";

export function loader({ request }) {

    const searchParam = new URL(request.url)
        .searchParams.get("search") || null
    
    if (searchParam === null) {
        return defer({
            films: new Promise((resolve) => {resolve(null)})
        })
    }
    return defer({ films: getFilmsBySearch(searchParam) })
}

export default function Films() {

    const [searchParams] = useSearchParams();
    const dataPromise = useLoaderData();

    
    function renderFilmElements(searchResult) {
        if (searchResult === null)
            return <h2 style={{color: "#FF0000"}}>Search for a film</h2>
        if (searchResult.Response === "False")
            return <h2 style={{color: "#FF0000"}}>{searchResult.Error}</h2>

        console.log(searchResult)
        const films = searchResult.Search;
        
        const filmElements = films.map(film => (
            <Link
                key={film.imdbID}
                to={film.imdbID}
                state={{
                    search: `?${searchParams.toString()}`,
                }}
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