import { Button, Typography } from '@mui/material';
import cn from 'classnames';
import { useNavigate } from 'react-router';

import { routes } from 'Root';

import css from './ErrorLayout.css';

export type ErrorLayoutProps = {
    title: string;
    text: string;
    withoutBackButton?: boolean;
};

export const ErrorLayout = ({ title, text, withoutBackButton }: ErrorLayoutProps) => {
    const navigate = useNavigate();
    return (
        <div className={cn(css.container)}>
            <Typography variant="h1" className={cn(css.title)} color="text.primary">
                {title}
            </Typography>
            <Typography className={cn(css.text)}>{text}</Typography>
            {!withoutBackButton && (
                <Button
                    type="submit"
                    variant="contained"
                    className={cn(css.button)}
                    onClick={() => navigate(routes.main)}
                >
                    Вернуться
                </Button>
            )}
        </div>
    );
};
