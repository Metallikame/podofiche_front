import React from "react";
import "./LoginStyles.css";
import LoginForm from "./LoginForm";

const Login = () => {
    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">CONNEXION</h2>
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;
