import axios from "axios";

export const bookBaseUrl = axios.create({
    baseURL: "http://localhost:8000/book",
});

// 1. REQUEST: Attach Token
bookBaseUrl.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. RESPONSE: Handle Expiration (The "Kick Out" Logic)
bookBaseUrl.interceptors.response.use(
    (response) => response,
    (error) => {
        // If Backend says "401 Unauthorized" (Token Expired)
        if (error.response && error.response.status === 401) {
            alert("Session expired. Please log in again.");
            
            // Clear the old, dead token
            localStorage.clear();
            
            // Redirect to LOGIN (Not Register, because they already have an account)
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);