import React from 'react';

import { Button, Typography } from '@mui/material';
import cn from 'classnames';
import { Link as RouteLink, LinkProps } from 'react-router-dom';

import ArrowLeft from 'img/arrowLeft.svg';

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
        <Button
            variant="outlined"
            className={cn(css.backButton)}
            component={ForwardRouteLink}
            to={backLink}
        >
            <ArrowLeft className={cn(css.backButtonIcon)} />
            {backText}
        </Button>
        <div className={css.headerGroup}>
            <Typography variant="h1">{title}</Typography>
            {children}
        </div>
    </header>
);
