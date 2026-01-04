import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleLoginBtn = () => {
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const { data } = await axios.post("http://localhost:8000/user/google-login", {
                token: credentialResponse.credential
            });

            if (data.Success) {
                alert(data.Message);
                localStorage.setItem("token", data.Token);
                localStorage.setItem("user", JSON.stringify(data.Data));
                navigate('/home'); // Redirects to home
            }
        } catch (error) {
            console.log(error);
            alert("Google Login Failed");
        }
    };

    const handleGoogleError = () => {
        alert("Google Login Failed");
    };

    return (
        <div className="flex justify-center">
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                // You can style it here if you want
                // theme="filled_blue"
                // shape="pill"
            />
        </div>
    );
};

export default GoogleLoginBtn;