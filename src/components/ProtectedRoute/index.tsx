import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthContextType {
    user: unknown;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

function useAuth() {
    return React.useContext(AuthContext);
}

// eslint-disable-next-line no-undef
export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth?.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
