import React from 'react';

import { Link } from '@mui/material';
import cn from 'classnames';
import { Link as RouteLink, LinkProps } from 'react-router-dom';

import { Image } from 'components/Image';
import arrowLeft from 'img/arrowLeft.svg';

import css from './Header.css';

type IHeaderProps = {
    title?: string | undefined;
    backText?: string | undefined;
    backLink?: string | undefined;
    children?: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-shadow
const ForwardRouteLink = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
    return <RouteLink {...props} ref={ref} />;
});

export const Header = ({
    title = '',
    backText = 'В главное меню',
    backLink = '',
    children,
}: IHeaderProps) => (
    <header className={css.header}>
        <Link
            color="primary"
            className={cn(css.backButton)}
            component={ForwardRouteLink}
            to={backLink}
        >
            <Image src={arrowLeft} alt="back" width={24} className={css.backButtonIcon} />
            {backText}
        </Link>
        <div className={css.headerGroup}>
            <h1 className={css.headerTitle}>{title}</h1>
            {children}
        </div>
    </header>
);
