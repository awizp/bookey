import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    // if not logged in
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // if logged in
    return children;
};

export default ProtectedRoute;