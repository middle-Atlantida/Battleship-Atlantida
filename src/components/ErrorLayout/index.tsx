import React from 'react';

import {
    Button,
    Typography,
} from '@mui/material';
import cn from 'classnames';

import css from './ErrorLayout.css';

export type ErrorLayoutProps = {
    title: string;
    text: string;
    withoutBackButton?: boolean;
};

export const ErrorLayout = ({ title, text, withoutBackButton }: ErrorLayoutProps) => (
    <div className={cn(css.container)}>
        <Typography variant="h1" className={cn(css.title)}>
            {title}
        </Typography>
        <Typography className={cn(css.text)}>{text}</Typography>
        {
            !withoutBackButton && <Button type="submit" variant="contained" className={cn(css.button)}>Вернуться</Button>
        }
    </div>
);
