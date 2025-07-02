import React from "react";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const isAuthenticated = localStorage.getItem("authToken"); // On vérifie si l'utilisateur a un token d'authentification dans le localStorage

    return isAuthenticated ? children : <Navigate to="/login" />; // Redirige vers login si non authentifié
};

export default PrivateRoute;
