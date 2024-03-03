import { films, reviews } from "./data";

export async function loginUser(creds) {
    const res = await new Promise((resolve) => {
        setTimeout(() => {
            if (creds.username === "trebor" && creds.password === "123") {
                resolve({ok: true})
            } else {
                resolve({
                    ok: false,
                    message: "Wrong credentials",
                    statusText: "Status text...",
                    status: "Status..."
                })
            }
        }, 1000);
    });

    const data = res; // await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status,
        }
    }

    return data;
}

export async function getFilmsBySearch(search) {
    const data = await fetch(`https://www.omdbapi.com/?apikey=ade75ec2&s=${search}`);
    const datajson = await data.json();
    return datajson
}

export async function getFilmById(id) {
    const data = await fetch(`https://www.omdbapi.com/?apikey=ade75ec2&i=${id}`);
    const datajson = await data.json();
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