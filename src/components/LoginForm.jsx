import React, {useState} from "react";
import {useNavigate} from "react-router-dom"; // Hook pour rediriger après login
import LoginButton from "./LoginButton";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook pour gérer la redirection

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simuler l'authentification avec un token
        if (username === "admin" && password === "admin*44") { // Exemple basique d'authentification
            localStorage.setItem("authToken", "your_token_here"); // Sauvegarde du token dans le localStorage
            navigate("/EditTemplate"); // Redirection vers la page d'accueil après connexion réussie
        } else {
            alert("Identifiant ou mot de passe incorrect");
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Identifiant</label>
                <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Identifiant"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <span className="forgot-password">Mot de passe oublié ?</span>
            <LoginButton/>
        </form>
    );
};

export default LoginForm;
