import React, { FC } from 'react';
import {
    Button,
    Typography,
} from '@mui/material';
import cn from 'classnames';
import css from './ErrorLayout.css';

type OwnProps = {
    title: string;
    text: string;
    withoutBackButton?: boolean;
}

export type ErrorLayoutProps = FC<OwnProps>;

export const ErrorLayout: ErrorLayoutProps = ({ title, text, withoutBackButton }) => (
    <div className={cn(css.container)}>
        <Typography variant="h1" className={cn(css.title)}>{title}</Typography>
        <Typography className={cn(css.text)}>{text}</Typography>
        {
            !withoutBackButton
            && <Button type="submit" variant="contained" className={cn(css.button)}>Вернуться</Button>
        }
    </div>
);
