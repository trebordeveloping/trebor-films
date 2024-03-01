import { getFilmData } from "./data";

export function getFavourites() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getFilmData();
            resolve(data);
        }, 1000); // 1000 milliseconds = 1 second
    });
}
