import React from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({children}) => {
    const isAuthenticated = localStorage.getItem("authToken");

    return isAuthenticated ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default PrivateRoute;
