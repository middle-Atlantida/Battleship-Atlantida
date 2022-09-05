import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { routes } from 'Root';
import { useAuth } from './useAuth';

export const useRedirectIfAuthenticated = (redirectUrl = routes.main) => {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirectUrl);
        }
    }, [isAuthenticated]);
};
