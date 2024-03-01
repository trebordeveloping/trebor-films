import { films, reviews } from "./data";

export async function getFilmsBySearch(search) {
    const data = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=ade75ec2`)
    const datajson = await data.json()
    return datajson
}

export function getFilms() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = films();
            resolve(data);
        }, 1000);
    });
}

export function getFavourites() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = films();
            resolve(data);
        }, 1000);
    });
}

export function getReviews() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = reviews();
            resolve(data);
        }, 1000)
    });
}