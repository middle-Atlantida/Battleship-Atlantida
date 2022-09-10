import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { routes } from 'src/Root';
import { useStore } from 'react-redux';

function useAuth() {
    const store = useStore();
    return store.getState().userReducer;
}

type Props = {
    children?: ReactNode;
}

export const ProtectedRoute = ({ children }: Props): JSX.Element => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth?.user) {
        return <Navigate to={routes.login} state={{ from: location }} replace />;
    }

    return children as JSX.Element;
};
