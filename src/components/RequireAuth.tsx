import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppContext } from "../App.context";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { logged } = useAppContext();
    const location = useLocation();
  
    if (logged === null) {
        return <>Loading</>
    } else if (!logged) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireAuth