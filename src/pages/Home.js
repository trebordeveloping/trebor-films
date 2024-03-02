import React from "react";
import {
    useNavigation,
    Form,
    redirect,
    useActionData
} from "react-router-dom";

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
            <h1>Home</h1>

            <SearchBar />

            <p>{errorMessage}</p>
        </div>
    )
}