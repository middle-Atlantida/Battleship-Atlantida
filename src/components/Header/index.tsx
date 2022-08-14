import React from 'react';
import css from './Header.module.css';
import { ArrowLeft } from '../icons/ArrowLeft';

type IHeaderProps = {
    title?: string
};

const Header = ({ title = '' }: IHeaderProps) => (
    <header className={css.header}>
        <a href="#" className={css.backButton}>
            <ArrowLeft width={24} height={24} color={'white'}/>В главное меню
        </a>
        <h1 className={css.headerTitle}>{title}</h1>
    </header>
);

export default Header;
