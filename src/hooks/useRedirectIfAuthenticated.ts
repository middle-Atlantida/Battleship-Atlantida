import { useEffect } from 'react';

import { useNavigate } from 'react-router';

import { routes } from 'Root';

import { useAuth } from './useAuth';

export const useRedirectIfAuthenticated = (redirectUrl = routes.main) => {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const awaitIsAuth = async () => {
            if (await isAuthenticated) {
                navigate(redirectUrl);
            }
        };

        awaitIsAuth();
    }, [isAuthenticated, navigate, redirectUrl]);
};
