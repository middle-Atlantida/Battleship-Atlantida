import React from 'react';
import { Link } from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';
import { ArrowLeft } from '../icons/ArrowLeft';
import css from './Header.module.css';

type IHeaderProps = {
    title?: string | undefined,
    backText?: string | undefined,
    backLink?: string | undefined,
    children?: React.ReactNode
};

export const Header = ({
    title = '', backText = '', backLink = '', children,
}: IHeaderProps) => (
    <header className={css.header}>
        <Link color="primary" className={css?.backButton ?? ''} component={RouteLink} to={backLink}>
            <ArrowLeft width={24} height={24} color={'white'}/>{backText}
        </Link>
        <div className={css.headerGroup}>
            <h1 className={css.headerTitle}>{title}</h1>
            {children}
        </div>
    </header>
);
