import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token"); // ดึง token ที่เก็บไว้หลัง login
    return token ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;