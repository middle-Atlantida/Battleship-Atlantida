import { Button } from '@mui/material';
import classNames from 'classnames';

import DarkIcon from 'img/dark.svg';
import LightIcon from 'img/light.svg';
import { Theme, useTheme } from 'utils/theme';

import css from './ThemeSwitcher.css';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            {theme === Theme.LIGHT ? (
                <Button className={classNames(css.themeSwitcher)} onClick={toggleTheme}>
                    <LightIcon />
                </Button>
            ) : (
                <Button
                    variant="contained"
                    className={classNames(css.themeSwitcher)}
                    onClick={toggleTheme}
                >
                    <DarkIcon />
                </Button>
            )}
        </>
    );
};
