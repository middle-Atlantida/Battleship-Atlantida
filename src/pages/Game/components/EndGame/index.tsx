import React from 'react';
import {
    Stack,
    Button,
    Link,
} from '@mui/material';
import { Link as RouteLink } from 'react-router-dom';
import { Image } from 'components/Image';
import { routes } from 'pages/Root';
import arrowLeft from 'img/arrowLeft.svg';
import cn from 'classnames';
import css from './EndGame.css';

interface IEndGame {
    onClick: () => void;
}

export const EndGame = ({ onClick }: IEndGame) => (
    <div className={css.container}>
        <Stack
            direction="column"
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <Button type="button" variant="text" className={cn(css.button)} onClick={onClick} >Начать заново</Button>
            <Link color="primary" className={cn(css.backButton)} component={RouteLink} to={routes.main}>
                <Image src={arrowLeft} alt="back" width={24} />{ 'В главное меню' }
            </Link>
            <Link color="primary" className={cn(css.backButton)} component={RouteLink} to={routes.leaderboard}>
                <Image src={arrowLeft} alt="back" width={24} />{ 'Таблица лидеров' }
            </Link>
        </Stack>
    </div>
);
