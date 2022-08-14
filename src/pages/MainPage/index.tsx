import React from 'react';
import cn from 'classnames';
import css from './MainPage.module.css';

const MainPage = () => (
    <div className={css.container}>
        <h1 className={cn(css.mainPageTitle)}>МОРСКОЙ БОЙ</h1>
        <ul className={cn(css.menuSelection)}>
            <li>Играть</li>
            <li>Таблица лидеров</li>
            <li>Форум</li>
            <li>Настройки</li>
            <li>Выйти</li>
        </ul>
    </div>
);

export default MainPage;
