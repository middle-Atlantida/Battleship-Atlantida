import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { routes } from 'pages/Root';
import { AuthAPI } from 'api/auth';
import css from './MainMenu.css';

export const MainMenu = () => {
    const [logoutError, setLogoutError] = useState('');
    const navigate = useNavigate();

    const onLogout = async () => {
        try {
            const data = await AuthAPI.logout();
            if (data) {
                navigate(routes.login);
            }
        } catch (error) {
            if (error instanceof Error) { setLogoutError(error.message); }
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
                <RouteLink to={routes.forum}>
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
