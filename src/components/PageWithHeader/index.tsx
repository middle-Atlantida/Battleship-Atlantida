import React from 'react';
import {
    Link,
} from '@mui/material';
import cn from 'classnames';
import css from './PageWithHeader.css';

type PageWithHeaderProps = {
    backText: string;
    backUrl: string;
    headerText: string;
    children: React.ReactNode;
}

export const PageWithHeader = ({
    children, headerText, backText, backUrl,
}: PageWithHeaderProps) => (
    <div className={cn(css.container)}>
        <header>
            <p>{backText}</p>
            <Link>{backUrl}</Link>
            {headerText}
        </header>
        {children}
    </div>
);
