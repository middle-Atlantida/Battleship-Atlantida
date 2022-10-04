import { Stack, Button, Link, Paper, Typography } from '@mui/material';
import cn from 'classnames';
import { Link as RouteLink } from 'react-router-dom';

import { Image } from 'components/Image';
import arrowBlack from 'img/arrowBlack.svg';
import rotate from 'img/rotate.svg';
import star from 'img/star.svg';
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
                <Button type="button" variant="text" className={cn(css.button)} onClick={onClick}>
                    <Image src={rotate} alt="back" width={24} className={cn(css.img)} />
                    <Typography variant="body1" color="text.primary">
                        {'Начать заново'}
                    </Typography>
                </Button>
            </li>
            <li className={cn(css.list__item)}>
                <Link
                    color="primary"
                    className={cn(css.button)}
                    component={RouteLink}
                    to={routes.leaderboard}
                >
                    <Image src={star} alt="back" width={24} className={cn(css.img)} />
                    <Typography variant="body1" color="text.primary">
                        {'Таблица лидеров'}
                    </Typography>
                </Link>
            </li>
            <li className={cn(css.list__item)}>
                <Link
                    color="primary"
                    className={cn(css.button)}
                    component={RouteLink}
                    to={routes.main}
                >
                    <Image src={arrowBlack} alt="back" width={24} className={cn(css.img)} />
                    <Typography variant="body1" color="text.primary">
                        {'В главное меню'}
                    </Typography>
                </Link>
            </li>
        </Stack>
    </Paper>
);
