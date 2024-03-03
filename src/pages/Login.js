import React from "react";
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigation,
} from "react-router-dom";

import "./Login.css";

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    const pathname = newURl(request.url)
        .searchParams.get("redirectTo") || "/account"
    
    try {
        const data = await loginUser({ email, password });
        localStorage.setItem("loggedin", true);
        return redirect(pathname)
    } catch(err) {
        return err.message
    }
}

export default function Login() {

    const errorMessage = useActionData();
    const message = useLoaderData();
    const navigation = useNavigation();

    return (
        <div className="login--page">
            <h1>Sign in</h1>
            {message && (
                <h3 style={{color: "red"}}>{message}</h3>
            )}
            {errorMessage && (
                <h3 style={{color: "red"}}>{errorMessage}</h3>
            )}

            <Form
                method="post"
                className="login-form"
                replace
            >
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging in ..."
                        : "Log in"
                    }
                </button>
            </Form>
        </div>
    )
}