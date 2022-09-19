import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from 'src/Root';
import { useAuth } from 'utils/hooks';

type Props = {
    children?: ReactNode;
}

export const ProtectedRoute = ({ children }: Props): JSX.Element => {
    const location = useLocation();
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={routes.login} state={{ from: location }} replace />;
    }

    return children as JSX.Element;
};
