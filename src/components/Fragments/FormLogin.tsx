import React from "react";
import { useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { login } from "../../services/auth";

type LoginError = {
    message: string;
};

const FormLogin: React.FC = () => {
    const [loginFailed, setLoginFailed] = useState("");

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const form = event.target as HTMLFormElement;
        const data = {
            email: form.email.value,
            password: form.password.value,
        };
    
        login(data, (status, res) => {
            if (status) {
                localStorage.setItem("access_token", res as string);
                window.location.href = "/products";
            } else {
                const errorMessage =
                    (res as LoginError).message || "Login failed. Please try again.";
                setLoginFailed(errorMessage);
            }
        });
    };

    return (
        <form onSubmit={handleLogin}>
            <InputForm
                label="Email"
                type="email"
                placeholder="contoh@mail.com"
                name="email"
            />
            <InputForm
                label="Password"
                type="password"
                placeholder="**********"
                name="password"
            />
            <Button variant="bg-blue-600 w-full" type="submit">
                Login
            </Button>
            {loginFailed && (
                <p className="text-red-500 text-center mt-3">{loginFailed}</p>
            )}
        </form>
    );
};

export default FormLogin;
