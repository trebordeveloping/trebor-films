import React, { useState } from "react";
import {
    Form,
    useNavigation,
    Link,
    redirect,
    useActionData,
    useSearchParams,
} from "react-router-dom";

import "./Register.css";
import { useAuth } from "../../contexts/AuthContext";

export async function action({ request }) {

    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/account"
    
    try {
        // throw new Error("dick");
        return redirect(pathname);
    } catch(err) {
        console.log(err);
        return err.message;
    }
}

export default function Register() {

    const [registerCreds, setRegisterCreds] = useState({
        email: '',
        password: '',
    })

    const errorMessage = useActionData();
    const navigation = useNavigation();
    const [searchParams] = useSearchParams();

    const { isUserLoggedIn } = useAuth();

    if (isUserLoggedIn) {
        return <h2 style={{color: "red"}}>Already logged in.</h2>
    }

    function handleChange(event) {
        setRegisterCreds(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    return (
        <div className="register--page">
            <h1>Register</h1>
            {/* {message && (
                <h3 style={{color: "red"}}>{message}</h3>
            )} */}
            {errorMessage && (
                <h3 style={{color: "red"}}>{errorMessage}</h3>
            )}

            <Form
                method="post"
                className="register-form"
                replace
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={registerCreds.email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={registerCreds.password}
                    onChange={handleChange}
                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Signing up ..."
                        : "Sign up"
                    }
                </button>
            </Form>
            <section className="login--container">
                <p>Already have an account</p>
                <Link
                    to={"/login" + (searchParams.get("redirectTo") ?
                    `?redirectTo=${searchParams.get("redirectTo")}`
                    : '')
                }
                    style={{textDecoration: 'underline'}}
                >
                    Log in here
                </Link>
            </section>
        </div>
    )
}