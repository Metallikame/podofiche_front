import React from "react";
import Error404 from "../components/Error404";
import EditTemplate from "../components/EditTemplate";
import Login from "../components/Login"; // Import Login

const routesUser = [
    {path: "*", component: <Error404/>}
];

const routesHome = [
    {path: "EditTemplate", component: <EditTemplate/>},
    {path: "login", component: <Login/>} // Add login route
];

export {routesUser, routesHome};
