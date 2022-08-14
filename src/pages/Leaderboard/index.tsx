import React from 'react';
import cn from 'classnames';
import Header from 'components/Header';
import css from './Leaderboard.module.css';

const Leaderboard = () => (
    <>
        <Header/>
        <main className={cn(css.container)}>
            <h1 className={cn(css.mainPageTitle)}>МОРСКОЙ БОЙ</h1>
            <ul className={cn(css.menuSelection)}>
                <li>Играть</li>
                <li>Таблица лидеров</li>
                <li>Форум</li>
                <li>Настройки</li>
                <li>Выйти</li>
            </ul>
        </main>
    </>
);

export default Leaderboard;
