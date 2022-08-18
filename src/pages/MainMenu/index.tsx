import React, { useState } from 'react';
import cn from 'classnames';
import { logout } from 'api/auth';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import css from './MainMenu.module.css';

export const MainMenu = () => {
    const [logoutError, setLogoutError] = useState('');

    const onLogout = async () => {
        try {
            const res = await logout();
            if (res.status === 200) {
                // TODO router push to signin page
                console.log(res);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const { message } = err;
                setLogoutError(message);
            }
        }
    };

    return (
        <>
            <div className={css.container}>
                <h1 className={cn(css.mainPageTitle)}>МОРСКОЙ БОЙ</h1>
                <ul className={cn(css.menuSelection)}>
                    <li>Играть</li>
                    <li>Таблица лидеров</li>
                    <li>Форум</li>
                    <li>Настройки</li>
                    <li onClick={onLogout}>Выйти</li>
                </ul>
                <Snackbar open={!!logoutError} onClose={() => setLogoutError('')} autoHideDuration={2000}>
                    <Alert severity="error" variant="filled">{logoutError}</Alert>
                </Snackbar>
            </div>

        </>
    );
};
