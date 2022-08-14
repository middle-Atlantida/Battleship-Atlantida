import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthContextType {
    user: unknown;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

function useAuth() {
    return React.useContext(AuthContext);
}

type Props = {
    children?: ReactNode;
}

export const ProtectedRoute = ({ children }: Props): JSX.Element => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth?.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children as JSX.Element;
};
