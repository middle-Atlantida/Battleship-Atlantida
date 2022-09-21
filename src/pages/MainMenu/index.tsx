import React, { useState } from 'react';

import { Alert, Snackbar } from '@mui/material';
import { Link as RouteLink, useNavigate } from 'react-router-dom';

import { AuthAPI } from 'api/auth';
import { useAppDispatch } from 'hooks';
import { routes } from 'src/Root';
import { logoutUser } from 'store/actions/user';
import { setError } from 'utils/setError';

import css from './MainMenu.css';

export const MainMenu = () => {
    const [logoutError, setLogoutError] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onLogout = async () => {
        try {
            const data = await AuthAPI.logout();
            if (data) {
                await dispatch(logoutUser());
                navigate(routes.signIn);
            }
        } catch (error) {
            setError(error, setLogoutError);
        }
    };

    return (
        <div className={css.container}>
            <h1 className={css.mainPageTitle}>МОРСКОЙ БОЙ</h1>
            <ul className={css.menuSelection}>
                <RouteLink to={routes.game}>
                    <li>Играть</li>
                </RouteLink>
                <RouteLink to={routes.leaderboard}>
                    <li>Таблица лидеров</li>
                </RouteLink>
                <RouteLink to={routes.forums}>
                    <li>Форум</li>
                </RouteLink>
                <RouteLink to={routes.settings}>
                    <li>Настройки</li>
                </RouteLink>
                <li onClick={onLogout}>Выйти</li>
            </ul>
            <Snackbar open={!!logoutError} onClose={() => setLogoutError('')} autoHideDuration={2000}>
                <Alert severity="error" variant="filled">{logoutError}</Alert>
            </Snackbar>
        </div>
    );
};
