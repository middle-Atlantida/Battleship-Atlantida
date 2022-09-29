import React, { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'hooks';
import { routes } from 'src/Root';

type Props = {
    children?: ReactNode;
};

export const ProtectedRoute = ({ children }: Props): JSX.Element => {
    const location = useLocation();
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={routes.signIn} state={{ from: location }} replace />;
    }

    return children as JSX.Element;
};
