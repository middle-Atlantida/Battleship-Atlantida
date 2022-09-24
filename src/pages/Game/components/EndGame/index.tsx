import { Stack, Button, Link } from '@mui/material';
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
    <div className={css.container}>
        <h2 className={cn(css.title)}>{winner ? 'Победа' : 'Поражение'}</h2>
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
                    {'Начать заново'}
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
                    {'Таблица лидеров'}
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
                    {'В главное меню'}
                </Link>
            </li>
        </Stack>
    </div>
);
