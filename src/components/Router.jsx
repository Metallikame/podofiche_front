import {Route, Routes} from "react-router-dom";
import {routesHome, routesUser} from '../tools/routes.js';
import React from 'react';
import LayerHome from "./LayerHome.jsx";
import LayerUser from "./LayerUser.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import EditTemplate from "./EditTemplate";
import Login from "../components/Login"; // Import the login component

const Router = () => {
    return (
        <Routes>
            {/* Public Route: Login */}
            <Route path="/login" element={<Login/>}/>

            <Route path="/EditTemplate/" element={<LayerUser/>}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <EditTemplate/>
                        </PrivateRoute>
                    }
                />
                {/* Map user routes */}
                {routesUser.map(({path, auth, component}, i) => {
                    return (
                        <Route
                            key={i}
                            path={path}
                            element={
                                <PrivateRoute auth={auth}>
                                    {component}
                                </PrivateRoute>
                            }
                        />
                    )
                })}
            </Route>

            <Route path="/" element={<LayerHome/>}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <EditTemplate/>
                        </PrivateRoute>
                    }
                />
                {/* Map home routes */}
                {routesHome.map(({path, auth, component}, i) => {
                    return (
                        <Route
                            key={i}
                            path={path}
                            element={
                                <PrivateRoute auth={auth}>
                                    {component}
                                </PrivateRoute>
                            }
                        />
                    )
                })}
            </Route>
        </Routes>
    );
};

export default Router;
