import React, { useState } from "react";
import {
    redirect,
    Form,
    useActionData,
    useLoaderData,
    useNavigation,
    Link,
    useSearchParams,
} from "react-router-dom";

import "./Login.css";
import { loginUser } from "../../firebase/auth";
import { useAuth } from "../../contexts/AuthContext";

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/account"
    
    try {
        await loginUser({ email, password });
        return redirect(pathname)
    } catch(err) {
        console.log(err);
        return err.message;
    }
}

export default function Login() {

    const [loginCreds, setLoginCreds] = useState({
        email: '',
        password: '',
    })

    const errorMessage = useActionData();
    const message = useLoaderData();
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();

    const { isUserLoggedIn } = useAuth();

    if (isUserLoggedIn) {
        return <h2 style={{color: "red"}}>Already logged in.</h2>
    }

    function handleChange(event) {
        setLoginCreds(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

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
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={loginCreds.email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={loginCreds.password}
                    onChange={handleChange}
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
            <section className="register--container">
                <p>Don't have an account yet?</p>
                <Link
                    to={"/register" + (searchParams.get("redirectTo") ?
                        `?redirectTo=${searchParams.get("redirectTo")}`
                        : '')
                    }
                    style={{textDecoration: 'underline'}}
                >
                    Create one here
                </Link>
            </section>
        </div>
    )
}