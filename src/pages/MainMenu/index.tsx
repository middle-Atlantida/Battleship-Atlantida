import React from 'react';
import cn from 'classnames';
import { logout } from 'api/auth';
import css from './MainMenu.module.css';

const onLogout = () => {
    logout()
        .then(res => {
            if (res.status === 200) {
            // TODO router push signin
            }
        });
};

export const MainMenu = () => (
    <div className={css.container}>
        <h1 className={cn(css.mainPageTitle)}>МОРСКОЙ БОЙ</h1>
        <ul className={cn(css.menuSelection)}>
            <li>Играть</li>
            <li>Таблица лидеров</li>
            <li>Форум</li>
            <li>Настройки</li>
            <li onClick={onLogout}>Выйти</li>
        </ul>
    </div>
);
