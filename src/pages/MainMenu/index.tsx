import { useState } from 'react';

import { Alert, Snackbar, Typography } from '@mui/material';
import classNames from 'classnames';
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
            <Typography variant="h1" className={classNames(css.mainPageTitle)} color="text.primary">
                МОРСКОЙ БОЙ
            </Typography>
            <ul className={css.menuSelection}>
                <RouteLink to={routes.game}>
                    <li>
                        <Typography variant="body1">Играть</Typography>
                    </li>
                </RouteLink>
                <RouteLink to={routes.leaderboard}>
                    <li>
                        <Typography variant="body1">Таблица лидеров</Typography>
                    </li>
                </RouteLink>
                <RouteLink to={routes.forums}>
                    <li>
                        <Typography variant="body1">Форум</Typography>
                    </li>
                </RouteLink>
                <RouteLink to={routes.settings}>
                    <li>
                        <Typography variant="body1">Настройки</Typography>
                    </li>
                </RouteLink>
                <li onClick={onLogout}>
                    <Typography variant="body1" color="error.main">
                        Выйти
                    </Typography>
                </li>
            </ul>
            <Snackbar
                open={!!logoutError}
                onClose={() => setLogoutError('')}
                autoHideDuration={2000}
            >
                <Alert severity="error" variant="filled">
                    {logoutError}
                </Alert>
            </Snackbar>
        </div>
    );
};
