import React from "react";
import {
    redirect,
    useActionData
} from "react-router-dom";

import "./Home.css";
import SearchBar from "../components/SearchBar";

export async function action({ request }) {
    const formData = await request.formData();
    const search =  formData.get("search");
    if (!search) return null // early return if search is empty

    const pathname = "/films";
    const searchParam = search ? `?search=${encodeURIComponent(search)}` : '';
    
    try {
        return redirect(pathname+searchParam)
    } catch(err) {
        return err.message
    }
}

export default function Home() {

    const errorMessage = useActionData()

    return (
        <div className="home--page">

            <SearchBar />

            <p>{errorMessage}</p>
        </div>
    )
}