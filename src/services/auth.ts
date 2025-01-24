import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface LoginResponse {
    access_token: string;
}

interface LoginError {
    message: string;
    statusCode?: number;
}

export const login = (
    data: { email: string; password: string },
    callback: (status: boolean, res: string | LoginError) => void
) => {
    axios
        .post<LoginResponse>("https://api.escuelajs.co/api/v1/auth/login", data)
        .then((res) => {
            callback(true, res.data.access_token);
        })
        .catch((error) => {
            const errorResponse: LoginError = error.response?.data || {
                message: "Unauthorized",
            };
            callback(false, errorResponse);
        });
};

export const getEmail = (access_token: string): string => {
    const decoded: { email: string } = jwtDecode(access_token);
    return decoded.email;
};

