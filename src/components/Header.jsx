// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./LoginStyles.css";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <header className="bg-dark text-white d-flex justify-content-between align-items-center p-3">
            <h1 className="texte_invisible">Décon</h1>
            <h1>PodoFiche</h1>
            <button
                className="btn btn-danger"
                onClick={handleLogout}
            >
                Déconnexion
            </button>
        </header>
    );
};

export default Header;
