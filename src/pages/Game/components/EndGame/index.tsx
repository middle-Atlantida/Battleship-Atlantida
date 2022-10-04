import { Stack, Button, Link, Paper, Typography } from '@mui/material';
import cn from 'classnames';
import { Link as RouteLink } from 'react-router-dom';

import ArrowLeftIcon from 'img/arrowLeft.svg';
import RotateIcon from 'img/rotate.svg';
import StarIcon from 'img/star.svg';
import { routes } from 'src/Root';

import css from './EndGame.css';

interface IEndGame {
    onClick: () => void;
    winner: boolean;
}

export const EndGame = ({ onClick, winner }: IEndGame) => (
    <Paper className={cn(css.container)}>
        <Typography variant="h1" color="text.primary">
            {winner ? 'Победа' : 'Поражение'}
        </Typography>
        <Stack
            component="ul"
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={cn(css.list)}
        >
            <li className={cn(css.list__item)}>
                <Link
                    color="text.primary"
                    className={cn(css.button)}
                    component={Button}
                    onClick={onClick}
                >
                    <RotateIcon />
                    <Typography variant="body1" color="text.primary">
                        {'Начать заново'}
                    </Typography>
                </Link>
            </li>
            <li className={cn(css.list__item)}>
                <Link
                    color="text.primary"
                    className={cn(css.button)}
                    component={RouteLink}
                    to={routes.leaderboard}
                >
                    <StarIcon />
                    <Typography variant="body1" color="text.primary">
                        {'Таблица лидеров'}
                    </Typography>
                </Link>
            </li>
            <li className={cn(css.list__item)}>
                <Link
                    color="text.primary"
                    className={cn(css.button)}
                    component={RouteLink}
                    to={routes.main}
                >
                    <ArrowLeftIcon />
                    <Typography variant="body1" color="text.primary">
                        {'В главное меню'}
                    </Typography>
                </Link>
            </li>
        </Stack>
    </Paper>
);
