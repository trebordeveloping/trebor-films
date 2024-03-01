import { films, reviews } from "./data";

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