import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    // if already logged in means block login and signup
    if (currentUser) {
        return <Navigate to="/app" replace />;
    }

    return children;
};

export default PublicRoute;