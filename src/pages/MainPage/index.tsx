import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { routes } from 'pages/Root';
import css from './MainPage.module.css';

export const MainPage = () => (
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
            <RouteLink to={routes.login}>
                <li>Выйти</li>
            </RouteLink>
        </ul>
    </div>
);
