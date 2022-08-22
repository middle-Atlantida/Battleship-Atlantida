import React from 'react';
import { Link } from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';
import { Image } from 'components/Image';
import arrowLeft from 'img/arrowLeft.svg';
import cn from 'classnames';
import css from './Header.css';

type IHeaderProps = {
    title?: string | undefined,
    backText?: string | undefined,
    backLink?: string | undefined,
    children?: React.ReactNode
};

export const Header = ({
    title = '', backText = 'В главное меню', backLink = '', children,
}: IHeaderProps) => (
    <header className={css.header}>
        <Link color="primary" className={cn(css.backButton)} component={RouteLink} to={backLink}>
            <Image src={arrowLeft} alt="back" width={24} />{backText}
        </Link>
        <div className={css.headerGroup}>
            <h1 className={css.headerTitle}>{title}</h1>
            {children}
        </div>
    </header>
);
