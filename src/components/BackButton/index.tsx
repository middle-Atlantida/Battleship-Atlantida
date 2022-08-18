import React from 'react';
import {
    Link,
} from '@mui/material';
import cn from 'classnames';
import css from './BackButton.css';

export type ErrorLayoutProps = {
    title: string;
    text: string;
    withoutBackButton?: boolean;
}

export const BackButton = ({ text, link }: ErrorLayoutProps) => (
    <div className={cn(css.container)}>
        <Link>{text}</Link>
    </div>
);
