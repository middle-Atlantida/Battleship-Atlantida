import {Button} from "@mui/material";
import cn from "classnames";
import {useNavigate} from "react-router-dom";

import {routes} from "Root";

import css from './Landing.css';

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <main className={cn(css.mainLanding)}>
            <video autoPlay muted loop className={cn(css.landingBackground)}>
                <source src="https://storage.yandexcloud.net/battleship-storage/screencast%202022-09-01%2013-52-16.mp4" type="video/mp4" height="100%"></source>
            </video>
            <div className={cn(css.descriptionLanding)}>
                <div className={cn(css.rules)}>
                    <h2>Правила расстановки</h2>
                    <p>
                        Поле 10×10

                        Размещаются:
                        1 корабль - 4-палубный
                        2 корабля - 3-палубные
                        3 корабля - 2-палубные
                        4 корабля - 1-палубные

                        Корабли не могут касаться друг друга сторонами и углами
                    </p>
                </div>
                <div className={cn(css.rules)}>
                    <h2>Правила боя</h2>
                    <p>
                        Игрок, выполняющий ход, совершает выстрел по клетке на карте противника

                        Если у противника на этой клетке имеется корабль, то корабль или его часть «топится», а попавший получает право сделать ещё один ход

                        Цель — первым потопить все корабли противника
                    </p>
                </div>
            </div>
            <Button
                type="submit"
                variant="contained"
                className={cn(css.button)}
                onClick={() => navigate(routes.main)}
            >
                В бой!
            </Button>
        </main>
    );
}
